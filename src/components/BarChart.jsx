import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export default function BarChart({ data }) {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [maxYValue, setMaxYValue] = useState(0);

  const isOverflow = data.length > 5;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const margin = {
      top: 5,
      right: 10,
      bottom: isOverflow ? 40 : 30,
      left: 30,
    };
    const parentWidth = svgRef.current.parentElement.offsetWidth;
    const parentHeight = svgRef.current.parentElement.offsetHeight;
    const width = isOverflow
      ? parentWidth + (data.length - 5) * 70
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
      .select('.bars')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('fill', '#F58A91')
      .attr('x', (d) => xScale(d.label) + xScale.bandwidth() / 2 - 11.5)
      .attr('y', (d) => {
        return yScale(d.value);
      })
      .attr('width', 23)
      .attr('height', (d) => height - yScale(d.value))
      .attr('rx', 4)
      .attr('ry', 4);
  }, [data, dimensions.width, dimensions.height]);

  useEffect(() => {
    const maxY = d3.max(data, (d) => d.value);
    if (maxY !== undefined) {
      setMaxYValue(maxY);
    }
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

  const additionalWidth = isOverflow ? (data.length - 5) * 70 + 30 : 0;
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
        <g className='bars' />
      </svg>
    </div>
  );
}
