/**
 * UsersSort.js
 *
 * Helper logic to sort a list of users by a field and direction.
 */

function compareStringValues(strA, strB, sortDirection) {
  const normA = strA.toLowerCase();
  const normB = (strB || '').toLowerCase();
  return sortDirection === 'asc'
    ? normA.localeCompare(normB)
    : normB.localeCompare(normA);
}

function compareNumericValues(valA, valB, sortDirection) {
  const numA = Number(valA) || 0;
  const numB = Number(valB) || 0;
  return sortDirection === 'asc' ? numA - numB : numB - numA;
}

export function sortUsers(users, sortField, sortDirection) {
  if (!sortField) return users;

  return [...users].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];

    if (typeof valA === 'string') {
      return compareStringValues(valA, valB, sortDirection);
    }

    return compareNumericValues(valA, valB, sortDirection);
  });
}
