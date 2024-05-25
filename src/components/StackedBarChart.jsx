import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export default function StackedBarChart({ data }) {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const isOverflow = data.length > 5;

  function arcParameter(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    return [
      rx,
      ',',
      ry,
      ' ',
      xAxisRotation,
      ' ',
      largeArcFlag,
      ',',
      sweepFlag,
      ' ',
      x,
      ',',
      y,
    ].join('');
  }

  function generatePathData(x, y, width, height, tr, br, bl, tl) {
    var data = [];
    data.push('M' + (x + width / 2) + ',' + y);
    data.push('H' + (x + width - tr));

    if (tr > 0) {
      data.push('A' + arcParameter(tr, tr, 0, 0, 1, x + width, y + tr));
    }

    data.push('V' + (y + height - br));

    if (br > 0) {
      data.push(
        'A' + arcParameter(br, br, 0, 0, 1, x + width - br, y + height)
      );
    }

    data.push('H' + (x + bl));

    if (bl > 0) {
      data.push('A' + arcParameter(bl, bl, 0, 0, 1, x + 0, y + height - bl));
    }

    data.push('V' + (y + tl));

    if (tl > 0) {
      data.push('A' + arcParameter(tl, tl, 0, 0, 1, x + tl, y + 0));
    }

    data.push('Z');

    return data.join(' ');
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const margin = {
      top: 5,
      right: 10,
      bottom: isOverflow ? 50 : 30,
      left: 30,
    };
    const parentWidth = svgRef.current.parentElement.offsetWidth;
    const parentHeight = svgRef.current.parentElement.offsetHeight;
    const width = isOverflow
      ? parentWidth + (data.length - 5) * 60
      : parentWidth - margin.left - margin.right;
    const height = parentHeight - margin.top - margin.bottom;

    setDimensions({ width, height });

    const stackKeys = Object.keys(data[0]).filter((key) => key !== 'group');
    const stack = d3.stack().keys(stackKeys);
    const series = stack(data);

    const xDomain = data.map((d) => d.group);
    const xRange = [0, width];
    const yDomain = [
      0,
      d3.max(series, (stackMax) => d3.max(stackMax, (d) => d[1])),
    ];
    const yRange = [height, 0];

    const xScale = d3
      .scaleBand()
      .domain(xDomain)
      .range(xRange)
      .paddingInner(0.3)
      .paddingOuter(0.3);

    const yScale = d3.scaleLinear().domain(yDomain).range(yRange);

    svg
      .select('.x-axis')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(xScale).tickSize(0).tickPadding(11))
      .selectAll('text')
      .style('font-family', 'Pretendard Variable')
      .style('font-size', '12px')
      .style('font-weight', '500');

    svg
      .select('.x-axis')
      .select('path')
      .style('stroke-dasharray', '4,4')
      .style('stroke', '#E1E1E1');

    svg.select('.x-axis').selectAll('.tick line').remove();

    svg
      .select('.y-axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale).ticks(5).tickSize(-width))
      .selectAll('line')
      .style('stroke-dasharray', '4,4')
      .style('stroke', '#E1E1E1');

    svg
      .select('.y-axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale).ticks(5).tickSize(-width))
      .selectAll('.tick text')
      .style('font-family', 'Pretendard Variable')
      .style('font-size', '12px')
      .style('font-weight', '500');

    svg.select('.y-axis').select('path').remove();

    const color = d3
      .scaleOrdinal()
      .domain(stackKeys)
      .range(['#F58A91', '#8AB2FF', '#BFF2CB']);

    svg
      .select('.bars')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .selectAll('path')
      .data((d, i) => {
        return d.map((item, index) => ({
          ...item,
          order: i,
        }));
      })
      .join('path')
      .attr('d', (d, i) => {
        const x = xScale(xDomain[i]) + xScale.bandwidth() / 2 - 11.5;
        const y = yScale(d[1]);
        const height = yScale(d[0]) - yScale(d[1]);
        const width = 23;
        if (d.order === 0) {
          return generatePathData(x, y, width, height, 0, 4, 4, 0);
        } else if (d.order === 1) {
          return generatePathData(x, y, width, height, 0, 0, 0, 0);
        } else {
          return generatePathData(x, y, width, height, 4, 0, 0, 4);
        }
      });
  }, [data, dimensions.width, dimensions.height]);

  useEffect(() => {
    const handleResize = () => {
      const parentWidth = svgRef.current.parentElement.offsetWidth;
      const parentHeight = svgRef.current.parentElement.offsetHeight;
      const width = parentWidth - 50 - 30;
      const height = parentHeight - 20 - 30;

      setDimensions({ width, height });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const additionalWidth = isOverflow ? (data.length - 5) * 60 : 0;
  return (
    <div style={{ width: '100%', height: '100%', overflowX: 'auto' }}>
      <svg
        ref={svgRef}
        style={{
          width: `calc(100% + ${additionalWidth}px)`,
          height: '100%',
        }}
      >
        <g className='x-axis' />
        <g className='y-axis' />
        <g className='bars' />
      </svg>
    </div>
  );
}
