export interface IFilterOption {
  title: string; // Optional title for the filter section
  options: {
    label: string; // Display label for the option
    prop: string; // Corresponding property for filtering
  }[]; // Standard options
  accordion: {
    accordionTitle: string; // Title for the accordion
    items: IAccordionOption[]; // Array of options to include in the accordion
  };
};

export interface IAccordionOption {
  title: string; // Title for each accordion item
  options: {
    label: string; // Display label for the option
    prop: string; // Corresponding property for filtering
  }[];
};

export type FilterProps = {
  selectedOptions: string[],
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>,
};