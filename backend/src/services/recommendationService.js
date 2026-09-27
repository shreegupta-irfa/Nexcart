// Isolated rule-based recommendation seam. Replace this function with an ML provider later.
export const recommendationReason = ({ categoryMatch, viewed }) => categoryMatch ? 'Because you viewed similar products' : viewed ? 'Recently viewed category' : 'Popular with NexCart shoppers';
