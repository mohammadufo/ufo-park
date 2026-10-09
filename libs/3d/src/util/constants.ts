export const WORLD_DURATION = 27

export const WORLD_START = -500
export const WORLD_END = 400

/** How fast the ground (buildings, parked cars, road paint) scrolls, in units/s. */
export const WORLD_SPEED = (WORLD_END - WORLD_START) / WORLD_DURATION

/** Time between two city blocks, and the length of one block along the road. */
export const BLOCK_INTERVAL = 3.6
export const BLOCK_LENGTH = WORLD_SPEED * BLOCK_INTERVAL

export const FLOOR_HEIGHT = 6

/** The road runs along the x axis and spans z = -ROAD_HALF_WIDTH..ROAD_HALF_WIDTH. */
export const ROAD_HALF_WIDTH = 12
/** Depth of the curbside parking bays on each side of the road. */
export const PARKING_DEPTH = 3

// Palette (night city)
export const yellowColor = 'hsl(52, 100%, 50%)'
export const roadColor = '#19191b'
export const groundColor = '#0c0c0e'
export const sidewalkColor = '#151517'
export const fogColor = '#0e0e10'
export const headlightColor = '#fff4cf'
export const taillightColor = '#ff3b30'
