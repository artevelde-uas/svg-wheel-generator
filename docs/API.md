## Functions

<dl>
<dt><a href="#getWheelSegmentPath">getWheelSegmentPath(startAngle, endAngle, outerRadius, innerRadius, spokeWidth, origin)</a> ⇒ <code>string</code></dt>
<dd><p>Gets the path of a segment of a wheel</p>
</dd>
<dt><a href="#getWheelSegmentPaths">getWheelSegmentPaths(segmentCount, outerRadius, innerRadius, spokeWidth, angleOffset, origin)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Gets the paths of a given number of equal segments of a wheel</p>
</dd>
<dt><a href="#getWheelSegmentArcTextPath">getWheelSegmentArcTextPath(startAngle, endAngle, outerRadius, innerRadius, spokeWidth, origin)</a> ⇒ <code>string</code></dt>
<dd><p>Gets the arc text path of a segment of a wheel</p>
</dd>
<dt><a href="#getWheelSegmentArcTextPaths">getWheelSegmentArcTextPaths(segmentCount, outerRadius, innerRadius, spokeWidth, angleOffset, origin)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Gets the arc text paths of a given number of equal segments of a wheel</p>
</dd>
<dt><a href="#getWheelSegmentLineTextPath">getWheelSegmentLineTextPath(startAngle, endAngle, outerRadius, innerRadius, spokeWidth, origin)</a> ⇒ <code>string</code></dt>
<dd><p>Gets the line text path of a segment of a wheel</p>
</dd>
<dt><a href="#getWheelSegmentLineTextPaths">getWheelSegmentLineTextPaths(segmentCount, outerRadius, innerRadius, spokeWidth, angleOffset, origin)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Gets the line text paths of a given number of equal segments of a wheel</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Point">Point</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Line">Line</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="getWheelSegmentPath"></a>

## getWheelSegmentPath(startAngle, endAngle, outerRadius, innerRadius, spokeWidth, origin) ⇒ <code>string</code>
Gets the path of a segment of a wheel

**Kind**: global function  
**Returns**: <code>string</code> - The path data  

| Param | Type | Description |
| --- | --- | --- |
| startAngle | <code>number</code> | The start angle of the segment |
| endAngle | <code>number</code> | The end angle of the segment |
| outerRadius | <code>number</code> | The outer radius of the segment |
| innerRadius | <code>number</code> | The inner radius of the segment |
| spokeWidth | <code>number</code> | The width of the space between the segments |
| origin | [<code>Point</code>](#Point) | The origin point of the inner and outer circles that make up the segments |

<a name="getWheelSegmentPaths"></a>

## getWheelSegmentPaths(segmentCount, outerRadius, innerRadius, spokeWidth, angleOffset, origin) ⇒ <code>Array.&lt;string&gt;</code>
Gets the paths of a given number of equal segments of a wheel

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - An array of path data  

| Param | Type | Description |
| --- | --- | --- |
| segmentCount | <code>number</code> | The number of segments to divide the wheel in |
| outerRadius | <code>number</code> | The outer radius of the wheel |
| innerRadius | <code>number</code> | The inner radius of the wheel |
| spokeWidth | <code>number</code> | The width of the space between the segments |
| angleOffset | <code>number</code> | The starting angle of the first segment (starting from the top) |
| origin | [<code>Point</code>](#Point) | The origin point of the inner and outer circles that make up the segments |

<a name="getWheelSegmentArcTextPath"></a>

## getWheelSegmentArcTextPath(startAngle, endAngle, outerRadius, innerRadius, spokeWidth, origin) ⇒ <code>string</code>
Gets the arc text path of a segment of a wheel

**Kind**: global function  
**Returns**: <code>string</code> - The path data  

| Param | Type | Description |
| --- | --- | --- |
| startAngle | <code>number</code> | The start angle of the segment |
| endAngle | <code>number</code> | The end angle of the segment |
| outerRadius | <code>number</code> | The outer radius of the segment |
| innerRadius | <code>number</code> | The inner radius of the segment |
| spokeWidth | <code>number</code> | The width of the space between the segments |
| origin | [<code>Point</code>](#Point) | The origin point of the inner and outer circles that make up the segments |

<a name="getWheelSegmentArcTextPaths"></a>

## getWheelSegmentArcTextPaths(segmentCount, outerRadius, innerRadius, spokeWidth, angleOffset, origin) ⇒ <code>Array.&lt;string&gt;</code>
Gets the arc text paths of a given number of equal segments of a wheel

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - An array of path data  

| Param | Type | Description |
| --- | --- | --- |
| segmentCount | <code>number</code> | The number of segments to divide the wheel in |
| outerRadius | <code>number</code> | The outer radius of the wheel |
| innerRadius | <code>number</code> | The inner radius of the wheel |
| spokeWidth | <code>number</code> | The width of the space between the segments |
| angleOffset | <code>number</code> | The starting angle of the first segment (starting from the top) |
| origin | [<code>Point</code>](#Point) | The origin point of the inner and outer circles that make up the segments |

<a name="getWheelSegmentLineTextPath"></a>

## getWheelSegmentLineTextPath(startAngle, endAngle, outerRadius, innerRadius, spokeWidth, origin) ⇒ <code>string</code>
Gets the line text path of a segment of a wheel

**Kind**: global function  
**Returns**: <code>string</code> - The path data  

| Param | Type | Description |
| --- | --- | --- |
| startAngle | <code>number</code> | The start angle of the segment |
| endAngle | <code>number</code> | The end angle of the segment |
| outerRadius | <code>number</code> | The outer radius of the segment |
| innerRadius | <code>number</code> | The inner radius of the segment |
| spokeWidth | <code>number</code> | The width of the space between the segments |
| origin | [<code>Point</code>](#Point) | The origin point of the inner and outer circles that make up the segments |

<a name="getWheelSegmentLineTextPaths"></a>

## getWheelSegmentLineTextPaths(segmentCount, outerRadius, innerRadius, spokeWidth, angleOffset, origin) ⇒ <code>Array.&lt;string&gt;</code>
Gets the line text paths of a given number of equal segments of a wheel

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - An array of path data  

| Param | Type | Description |
| --- | --- | --- |
| segmentCount | <code>number</code> | The number of segments to divide the wheel in |
| outerRadius | <code>number</code> | The outer radius of the wheel |
| innerRadius | <code>number</code> | The inner radius of the wheel |
| spokeWidth | <code>number</code> | The width of the space between the segments |
| angleOffset | <code>number</code> | The starting angle of the first segment (starting from the top) |
| origin | [<code>Point</code>](#Point) | The origin point of the inner and outer circles that make up the segments |

<a name="Point"></a>

## Point : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The X coordinate |
| y | <code>number</code> | The Y coordinate |

<a name="Line"></a>

## Line : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| start | [<code>Point</code>](#Point) | The starting point of the line |
| end | [<code>Point</code>](#Point) | The end point of the line |

