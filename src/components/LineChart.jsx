import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '@assets/styles.css';

export default function LineChart({ data }) {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [maxYValue, setMaxYValue] = useState(0);

  const isOverflow = data.length > 5;

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

    const xDomain = data.map((d) => d.label);
    const xRange = [0, width];
    const yDomain = [0, Math.ceil(maxYValue / 20) * 20];
    const yRange = [height, 0];

    const xScale = d3
      .scaleBand()
      .domain(xDomain)
      .range(xRange)
      .paddingInner(0.3)
      .paddingOuter(0.3);

    const yScale = d3.scaleLinear().domain(yDomain).range(yRange);

    const line = d3
      .line()
      .x((d) => xScale(d.label) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.value));

    svg
      .select('.x-axis')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(xScale).tickSize(0).tickPadding(11))
      .selectAll('line')
      .style('stroke-dasharray', '4,4');

    svg
      .select('.x-axis')
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
      .selectAll('text')
      .style('font-family', 'Pretendard Variable')
      .style('font-size', '12px')
      .style('font-weight', '500');

    svg.select('.y-axis').select('path').remove();

    svg
      .select('.line')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', '#F58A91')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg
      .select('.dots')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.label) + xScale.bandwidth() / 2)
      .attr('cy', (d) => yScale(d.value))
      .attr('r', 6)
      .attr('fill', '#F58A91');
  }, [data, dimensions.width, dimensions.height]);

  useEffect(() => {
    const maxY = d3.max(data, (d) => d.value);
    setMaxYValue(maxY);
  }, [data]);

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

  const additionalWidth = isOverflow ? (data.length - 5) * 75 : 0;
  return (
    <div
      className='custom-scrollbar'
      style={{ width: '100%', height: '100%', overflowY: 'auto' }}
    >
      <svg
        ref={svgRef}
        style={{
          width: `calc(100% + ${additionalWidth}px)`,
          height: '100%',
        }}
      >
        <g className='x-axis' />
        <g className='y-axis' />
        <g className='line' />
        <g className='dots' />
      </svg>
    </div>
  );
}
