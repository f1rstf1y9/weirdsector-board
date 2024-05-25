import { supabase } from '../supabase';

// 두 날짜 사이의 포스트를 가져오는 함수
export async function fetchPostsBetweenDates(startDate, endDate) {
  try {
    const nextDay = new Date(endDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const isoEndDate = nextDay.toISOString();

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', isoEndDate);

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return [];
  }
}

// 날짜별로 게시글의 등록 수를 계산하는 함수
export function countPostsByDate(posts, startDate, endDate) {
  const postCountByDate = {};

  const dateRange = getDateRange(startDate, endDate);

  dateRange.forEach((date) => {
    postCountByDate[date] = 0;
  });

  posts.forEach((post) => {
    const date = new Date(post.created_at).toISOString().slice(0, 10);
    postCountByDate[date] = (postCountByDate[date] || 0) + 1;
  });

  const sortedCounts = Object.entries(postCountByDate).sort((a, b) => {
    return new Date(a[0]) - new Date(b[0]);
  });

  return sortedCounts.map(([date, count]) => ({
    label: formatDate(date),
    value: count,
  }));
}

// 날짜별로 각 board에 적힌 게시글의 수를 계산하는 함수
export function countPostsByDateAndBoard(posts, startDate, endDate) {
  const postCountByDateAndBoard = {};
  const dateRange = getDateRange(startDate, endDate);
  dateRange.forEach((date) => {
    postCountByDateAndBoard[date] = { free: 0, qna: 0, etc: 0 };
  });

  posts.forEach((post) => {
    const date = new Date(post.created_at).toISOString().slice(0, 10);
    const board = post.board;
    if (!postCountByDateAndBoard[date][board]) {
      postCountByDateAndBoard[date][board] = 0;
    }
    postCountByDateAndBoard[date][board] += 1;
  });

  return Object.entries(postCountByDateAndBoard)
    .sort((a, b) => {
      return new Date(a[0]) - new Date(b[0]);
    })
    .map(([date, countsByBoard]) => {
      const counts = { group: formatDate(date) };
      Object.entries(countsByBoard).forEach(([board, count]) => {
        counts[board] = count;
      });
      return counts;
    });
}

// startDate와 endDate 사이의 모든 날짜를 반환하는 함수
function getDateRange(startDate, endDate) {
  const dateRange = [];
  startDate = new Date(startDate).setDate(startDate.getDate() + 1);
  endDate = new Date(endDate).setDate(endDate.getDate() + 1);

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateRange.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateRange;
}

// 날짜를 원하는 형식으로 포맷하는 함수
function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${year}.${month}.${day}`;
}

// 포스트 id를 기반으로 해당 포스트에 작성된 해시태그의 id 가져오기
export async function fetchHashtagsForPosts(postIds) {
  try {
    const { data, error } = await supabase
      .from('post_hashtags')
      .select('hashtag_id')
      .in('post_id', postIds);

    if (error) {
      throw new Error(error.message);
    }

    return countHashtags(data);
  } catch (error) {
    console.error('Error fetching hashtags:', error.message);
    return [];
  }
}

// 해시태그 id별 사용 횟수를 계산하는 함수
export function countHashtags(hashtagIds) {
  const hashtagCounts = {};

  hashtagIds.forEach((hashtag) => {
    if (hashtagCounts[hashtag.hashtag_id]) {
      hashtagCounts[hashtag.hashtag_id]++;
    } else {
      hashtagCounts[hashtag.hashtag_id] = 1;
    }
  });

  const results = Object.entries(hashtagCounts).map(([hashtag_id, count]) => ({
    hashtag_id: parseInt(hashtag_id),
    value: count,
  }));

  return results;
}

// 해시태그 id를 기반으로 실제 해시태그 가져오기
export async function fetchHashtags(hashtagIds) {
  try {
    const hashtagPromises = hashtagIds.map(async (item) => {
      const { data, error } = await supabase
        .from('hashtags')
        .select('hashtag')
        .eq('hashtag_id', item.hashtag_id);

      if (error) {
        throw new Error(error.message);
      }

      return {
        label: `#${data[0].hashtag}`,
        value: item.value,
      };
    });

    const hashtagsData = await Promise.all(hashtagPromises);
    return hashtagsData;
  } catch (error) {
    console.error('Error fetching hashtags:', error.message);
    return [];
  }
}
