export const getVisiblePageRange = (
  currentPage: number,
  totalPages: number,
  visiblePages = 5
): (number | string)[] => {
  const half = Math.floor(visiblePages / 2);

  let start = Math.max(2, currentPage - half);
  let end = Math.min(totalPages - 1, currentPage + half);

  if (end - start < visiblePages - 1) {
    if (currentPage <= half) {
      end = Math.min(totalPages - 1, start + visiblePages - 1);
    } else {
      start = Math.max(2, end - visiblePages + 1);
    }
  }

  const pages: (number | string)[] = [1];

  if (start > 2) pages.push("...");

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) pages.push("...");

  if (totalPages > 1) pages.push(totalPages);

  return pages;
};