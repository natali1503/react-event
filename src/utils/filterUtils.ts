// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applySearch(data: any[], searchTerm: string) {
  return data.filter(
    (request) =>
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.organization.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debouncedFunction = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyFilter(data: any[], selectedOptions: string[]) {
  return (data = data.filter((request) => {
    const matchesRequesterType = !selectedOptions.includes(request.requesterType);
    const matchesHelpType = !selectedOptions.includes(request.helpType);
    const matchesHelperType = !selectedOptions.includes(request.helperRequirements.helperType);
    const matchesOnline = !selectedOptions.includes(`${request.helperRequirements.isOnline}`);
    const matchesQualification = !selectedOptions.includes(request.helperRequirements.qualification);
    const selectedDate = selectedOptions.find((option) => option.match(/^\d{4}-\d{2}-\d{2}$/));
    const matchesDate = selectedDate ? new Date(request.endingDate) <= new Date(selectedDate) : true;
    return (
      matchesRequesterType &&
      matchesHelpType &&
      matchesHelperType &&
      matchesOnline &&
      matchesQualification &&
      matchesDate
    );
  }));
}
