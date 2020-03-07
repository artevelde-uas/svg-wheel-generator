import { ShapeInfo, Intersection } from 'kld-intersections';


/**
 * @typedef Point
 * @type {object}
 * @property {number} x - The X coordinate
 * @property {number} y - The Y coordinate
 */

/**
 * @typedef Line
 * @type {object}
 * @property {Point} start - The starting point of the line
 * @property {Point} end - The end point of the line
 */

/**
 * Strips the whitespace from the path data
 *
 * @private
 * @param {string} path - The path data
 * @returns {string} The path data without unnecessary whitespace
 */
function stripWhitespace(path) {
    return path.replace(/\s+/g, ' ').trim();
}

/**
 * Gets the X and Y offset for points perpendicular to a line
 *
 * @private
 * @param {Point} start - The starting point of the line
 * @param {Point} end - The ending point of the line
 * @param {Point} offset - The distance of the points perpendicular to the line
 */
function getPerpendicularOffset(start, end, offset) {
    let differenceX = start.x - end.x;
    let differenceY = start.y - end.y;
    let distance = Math.sqrt(Math.pow(differenceX, 2) + Math.pow(differenceY, 2));
    let offsetX = differenceX * offset / distance;
    let offsetY = differenceY * offset / distance;

    return {
        offsetX,
        offsetY
    };
}

/**
 * Gets the point on a circle at the specified angle (in radians)
 *
 * @ignore
 * @deprecated Will be internal function in next major version
 * @param  {number} angle - The angle (in radians)
 * @param  {number} radius - The radius of the circle
 * @param  {Point} center - The center point of the circle
 * @returns {Point} A point on the circle
 */
export function getPointOnCircle(angle, radius, center = { x: 0, y: 0 }) {
    return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
    };
}

/**
 * Gets the start and end points of a line parallel at a given distance left of another line
 *
 * @ignore
 * @deprecated Will be internal function in next major version
 * @param {Point} start - The starting point of the line
 * @param {Point} end - The ending point of the line
 * @param {number} offset - The distance of the parallel to the given line
 * @returns {Line} A line parallel to the left of a given line
 */
export function getLeftParallelLine(start, end, offset) {
    let { offsetX, offsetY } = getPerpendicularOffset(start, end, offset);

    return {
        start: {
            x: start.x - offsetY,
            y: start.y + offsetX
        },
        end: {
            x: end.x - offsetY,
            y: end.y + offsetX
        }
    };
}

/**
 * Gets the start and end points of a line parallel at a given distance right of another line
 *
 * @ignore
 * @deprecated Will be internal function in next major version
 * @param {Point} start - The starting point of the line
 * @param {Point} end - The ending point of the line
 * @param {number} offset - The distance of the parallel to the given line
 * @returns {Line} A line parallel to the right of a given line
 */
export function getRightParallelLine(start, end, offset) {
    let { offsetX, offsetY } = getPerpendicularOffset(start, end, offset);

    return {
        start: {
            x: start.x + offsetY,
            y: start.y - offsetX
        },
        end: {
            x: end.x + offsetY,
            y: end.y - offsetX
        }
    };
}

/**
 * Gets the path of an annulus sector
 *
 * @param {number} startAngle - The start angle (in radians) of the sector
 * @param {number} endAngle - The end angle (in radians) of the sector
 * @param {number} outerRadius - The outer radius of the sector
 * @param {number} innerRadius - The inner radius of the sector
 * @param {number} spokeWidth - The width of the space between the sectors
 * @param {Point} center - The center point of the inner and outer circles that make up the sectors
 * @returns {string} The path data
 */
export function getAnnulusSectorPath(startAngle, endAngle, outerRadius, innerRadius = 0, spokeWidth = 0, center = { x: 0, y: 0 }) {
    let leftLine = getRightParallelLine(
        center,
        getPointOnCircle(startAngle, outerRadius + 1, center),
        spokeWidth / 2
    );
    let rightLine = getLeftParallelLine(
        center,
        getPointOnCircle(endAngle, outerRadius + 1, center),
        spokeWidth / 2
    );

    let leftLineShape = ShapeInfo.line(leftLine.start, leftLine.end);
    let rightLineShape = ShapeInfo.line(rightLine.start, rightLine.end);
    let outerCircleShape = ShapeInfo.circle(center, outerRadius);
    let innerCircleShape = ShapeInfo.circle(center, innerRadius);

    let outerArcStart = Intersection.intersect(leftLineShape, outerCircleShape).points[0];
    let outerArcEnd = Intersection.intersect(rightLineShape, outerCircleShape).points[0];

    if (innerRadius <= spokeWidth) {
        let lineIntersection = Intersection.intersect(leftLineShape, rightLineShape).points[0];

        return stripWhitespace(`
            M ${outerArcStart.x} ${outerArcStart.y}
            A ${outerRadius} ${outerRadius} 0 0 1 ${outerArcEnd.x} ${outerArcEnd.y}
            L ${lineIntersection.x} ${lineIntersection.y}
            Z
        `);
    }

    let innerArcStart = Intersection.intersect(rightLineShape, innerCircleShape).points[0];
    let innerArcEnd = Intersection.intersect(leftLineShape, innerCircleShape).points[0];

    return stripWhitespace(`
        M ${outerArcStart.x} ${outerArcStart.y}
        A ${outerRadius} ${outerRadius} 0 0 1 ${outerArcEnd.x} ${outerArcEnd.y}
        L ${innerArcStart.x} ${innerArcStart.y}
        A ${innerRadius} ${innerRadius} 0 0 0 ${innerArcEnd.x} ${innerArcEnd.y}
        Z
    `);
}

/**
 * Gets the paths of a given number of equal sectors of an annulus
 *
 * @param {number} sectorCount - The number of sectors to divide the annulus in
 * @param {number} outerRadius - The outer radius of the annulus
 * @param {number} innerRadius - The inner radius of the annulus
 * @param {number} spokeWidth - The width of the space between the sectors
 * @param {number} angleOffset - The starting angle (in radians) of the first sector (starting from the right)
 * @param {Point} center - The center point of the inner and outer circles that make up the sectors
 * @returns {string[]} An array of path data
 */
export function getAnnulusSectorPaths(sectorCount, outerRadius, innerRadius = 0, spokeWidth = 0, angleOffset = 0, center = { x: 0, y: 0 }) {
    let outerArcLength = 2 * Math.PI / sectorCount;

    return Array.from({ length: sectorCount }, (currentValue, index) => {
        let startAngle = angleOffset + (index * outerArcLength);
        let endAngle = startAngle + outerArcLength;

        return getAnnulusSectorPath(startAngle, endAngle, outerRadius, innerRadius, spokeWidth, center);
    });
}

/**
 * Gets the arc text path of an annulus sector
 *
 * @param {number} startAngle - The start angle (in radians) of the sector
 * @param {number} endAngle - The end angle (in radians) of the sector
 * @param {number} outerRadius - The outer radius of the sector
 * @param {number} innerRadius - The inner radius of the sector
 * @param {number} spokeWidth - The width of the space between the sectors
 * @param {Point} center - The center point of the inner and outer circles that make up the sectors
 * @returns {string} The path data
 */
export function getAnnulusSectorArcTextPath(startAngle, endAngle, outerRadius, innerRadius = 0, spokeWidth = 0, center = { x: 0, y: 0 }) {
    let leftLine = getRightParallelLine(
        center,
        getPointOnCircle(startAngle, outerRadius, center),
        spokeWidth / 2
    );
    let rightLine = getLeftParallelLine(
        center,
        getPointOnCircle(endAngle, outerRadius, center),
        spokeWidth / 2
    );

    let middleRadius = (innerRadius + outerRadius) / 2;

    let leftLineShape = ShapeInfo.line(leftLine.start, leftLine.end);
    let rightLineShape = ShapeInfo.line(rightLine.start, rightLine.end);
    let circleShape = ShapeInfo.circle(center, middleRadius);

    let textPathStart = Intersection.intersect(leftLineShape, circleShape).points[0];
    let textPathEnd = Intersection.intersect(rightLineShape, circleShape).points[0];

    if (textPathStart.x > textPathEnd.x) {
        return stripWhitespace(`
            M ${textPathEnd.x} ${textPathEnd.y}
            A ${middleRadius} ${middleRadius} 0 0 0 ${textPathStart.x} ${textPathStart.y}
        `);
    }

    return stripWhitespace(`
        M ${textPathStart.x} ${textPathStart.y}
        A ${middleRadius} ${middleRadius} 0 0 1 ${textPathEnd.x} ${textPathEnd.y}
    `);
}

/**
 * Gets the arc text paths of a given number of equal sectors of an annulus
 *
 * @param {number} sectorCount - The number of sectors to divide the annulus in
 * @param {number} outerRadius - The outer radius of the annulus
 * @param {number} innerRadius - The inner radius of the annulus
 * @param {number} spokeWidth - The width of the space between the sectors
 * @param {number} angleOffset - The starting angle (in radians) of the first sector (starting from the right)
 * @param {Point} center - The center point of the inner and outer circles that make up the sectors
 * @returns {string[]} An array of path data
 */
export function getAnnulusSectorArcTextPaths(sectorCount, outerRadius, innerRadius = 0, spokeWidth = 0, angleOffset = 0, center = { x: 0, y: 0 }) {
    let outerArcLength = 2 * Math.PI / sectorCount;

    return Array.from({ length: sectorCount }, (currentValue, index) => {
        let startAngle = angleOffset + (index * outerArcLength);
        let endAngle = startAngle + outerArcLength;

        return getAnnulusSectorArcTextPath(startAngle, endAngle, outerRadius, innerRadius, spokeWidth, center);
    });
}

/**
 * Gets the line text path of an annulus sector
 *
 * @param {number} startAngle - The start angle (in radians) of the sector
 * @param {number} endAngle - The end angle (in radians) of the sector
 * @param {number} outerRadius - The outer radius of the sector
 * @param {number} innerRadius - The inner radius of the sector
 * @param {number} spokeWidth - The width of the space between the sectors
 * @param {Point} center - The center point of the inner and outer circles that make up the sectors
 * @returns {string} The path data
 */
export function getAnnulusSectorLineTextPath(startAngle, endAngle, outerRadius, innerRadius = 0, spokeWidth = 0, center = { x: 0, y: 0 }) {
    let middleAngle = (startAngle + endAngle) / 2;

    let lineEnd = getPointOnCircle(middleAngle, outerRadius + 1, center);

    let lineShape = ShapeInfo.line(center, lineEnd);
    let innerCircleShape = ShapeInfo.circle(center, innerRadius);
    let outerCircleShape = ShapeInfo.circle(center, outerRadius);

    let textPathStart = Intersection.intersect(lineShape, innerCircleShape).points[0];
    let textPathEnd = Intersection.intersect(lineShape, outerCircleShape).points[0];

    if (textPathStart.x > textPathEnd.x) {
        return stripWhitespace(`
            M ${textPathEnd.x} ${textPathEnd.y}
            L ${textPathStart.x} ${textPathStart.y}
        `);
    }

    return stripWhitespace(`
        M ${textPathStart.x} ${textPathStart.y}
        L ${textPathEnd.x} ${textPathEnd.y}
    `);
}

/**
 * Gets the line text paths of a given number of equal sectors of an annulus
 *
 * @param {number} sectorCount - The number of sectors to divide the annulus in
 * @param {number} outerRadius - The outer radius of the annulus
 * @param {number} innerRadius - The inner radius of the annulus
 * @param {number} spokeWidth - The width of the space between the sectors
 * @param {number} angleOffset - The starting angle (in radians) of the first sector (starting from the right)
 * @param {Point} center - The center point of the inner and outer circles that make up the sectors
 * @returns {string[]} An array of path data
 */
export function getAnnulusSectorLineTextPaths(sectorCount, outerRadius, innerRadius = 0, spokeWidth = 0, angleOffset = 0, center = { x: 0, y: 0 }) {
    let outerArcLength = 2 * Math.PI / sectorCount;

    return Array.from({ length: sectorCount }, (currentValue, index) => {
        let startAngle = angleOffset + (index * outerArcLength);
        let endAngle = startAngle + outerArcLength;

        return getAnnulusSectorLineTextPath(startAngle, endAngle, outerRadius, innerRadius, spokeWidth, center);
    });
}

/* DEPRECATED FUNCTIONS */

function degToRad(deg) {
    return ((deg % 360) - 90) / 180 * Math.PI;
}

/**
 * @deprecated
 * @see getAnnulusSectorPath
 */
export function getWheelSegmentPath(startAngle, endAngle, outerRadius, innerRadius = 0, spokeWidth = 0, center = { x: 0, y: 0 }) {
    return getAnnulusSectorPath(degToRad(startAngle), degToRad(endAngle), outerRadius, innerRadius, spokeWidth, center);
}

/**
 * @deprecated
 * @see getAnnulusSectorPaths
 */
export function getWheelSegmentPaths(segmentCount, outerRadius, innerRadius = 0, spokeWidth = 0, angleOffset = 0, center = { x: 0, y: 0 }) {
    return getAnnulusSectorPaths(segmentCount, outerRadius, innerRadius, spokeWidth, degToRad(angleOffset), center);
}

/**
 * @deprecated
 * @see getAnnulusSectorArcTextPath
 */
export function getWheelSegmentArcTextPath(startAngle, endAngle, outerRadius, innerRadius = 0, spokeWidth = 0, center = { x: 0, y: 0 }) {
    return getAnnulusSectorArcTextPath(degToRad(startAngle), degToRad(endAngle), outerRadius, innerRadius, spokeWidth, center);
}

/**
 * @deprecated
 * @see getAnnulusSectorArcTextPaths
 */
export function getWheelSegmentArcTextPaths(segmentCount, outerRadius, innerRadius = 0, spokeWidth = 0, angleOffset = 0, center = { x: 0, y: 0 }) {
    return getAnnulusSectorArcTextPaths(segmentCount, outerRadius, innerRadius, spokeWidth, degToRad(angleOffset), center);
}

/**
 * @deprecated
 * @see getAnnulusSectorLineTextPath
 */
export function getWheelSegmentLineTextPath(startAngle, endAngle, outerRadius, innerRadius = 0, spokeWidth = 0, center = { x: 0, y: 0 }) {
    return getAnnulusSectorLineTextPath(degToRad(startAngle), degToRad(endAngle), outerRadius, innerRadius, spokeWidth, center);
}

/**
 * @deprecated
 * @see getAnnulusSectorLineTextPaths
 */
export function getWheelSegmentLineTextPaths(segmentCount, outerRadius, innerRadius = 0, spokeWidth = 0, angleOffset = 0, center = { x: 0, y: 0 }) {
    return getAnnulusSectorLineTextPaths(segmentCount, outerRadius, innerRadius, spokeWidth, degToRad(angleOffset), center);
}
