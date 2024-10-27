import React, { useEffect, useState } from "react";
// components
import Calendar from "./Calendar";
// styles
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";

interface AccordionOption {
  title: string; // Title for each set of options
  options: string[]; // Options within this section
}

interface FilterOption {
  title?: string;
  options?: string[]; // Standard options
  accordion?: {
    accordionTitle: string; // Title for the accordion
    items: AccordionOption[]; // Array of options to include in the accordion
  };
}

const filterData: FilterOption[] = [
  { title: "Кому мы помогаем", options: ["Пенсионеры", "Дома престарелых"] },
  { title: "Чем мы помогаем", options: ["Вещи", "Финансирование"] },
  {
    accordion: {
      accordionTitle: "Волонтерство",
      items: [
        {title: "Специализация", options: ["Квалифицированная", "Не требует профессии"]},
        { title: "Формат", options: ["Онлайн", "Офлайн"] },
        { title: "Необходимо волонтеров", options: ["Группа", "Один"] },
      ],
    },
  },
];

const Filters: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleReset = () => {
    setSelectedOptions([])
  };

  const handleApplyFilters = () => {
    console.log("Selected Options:", selectedOptions);
    // return selectedOptions.every(option => {
    //   // Adjust the condition based on your data structure
    //   return item.options.includes(option); // Assuming item.options is an array
    // });
  };

  useEffect(() => {
    handleApplyFilters();
  }, [selectedOptions]);

  return (
    <Paper sx={{ backgroundColor: "white", padding: "0.5rem 1.5rem" }}>
      <Typography>
        <h3>Фильтрация</h3>
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1}}>
        {filterData.map((item, index) => {
          if (item.options) {
            // render standard options with title
            return (
              <Box key={index}>
                <Typography variant="subtitle1" sx={{ opacity: "0.6" }}>
                  {item.title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: "column"}}>
                  {item.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={selectedOptions.includes(option)}
                          onChange={() => handleToggle(option)}
                        />
                      }
                      label={option}
                      sx={{ userSelect: "none" }}
                    />
                  ))}
                </Box>
              </Box>
            );
          } else if (item.accordion) {
            // Render accordion
            return (
              <Accordion
                sx={{
                  paddingLeft: "1rem",
                  margin: 0,
                  '&.Mui-expanded': {
                    margin: 0, // Ensure no margin when expanded
                  },
                }}
                key={index}
                expanded={expanded === item.accordion.accordionTitle}
                onChange={handleChange(item.accordion.accordionTitle)}
              >
                <AccordionSummary
                  aria-controls={`${item.accordion.accordionTitle}-content`}
                  id={`${item.accordion.accordionTitle}-header`}
                >
                  <Typography>{item.accordion.accordionTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1}}
                  >
                    {item.accordion.items.map((subItem) => (
                      <Box key={subItem.title} sx={{ display: 'flex', flexDirection: "column"}}>
                        <Typography variant="subtitle1" sx={{ opacity: "0.6" }}>
                          {subItem.title}
                        </Typography>
                        {subItem.options.map((option) => (
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleToggle(option)}
                              />
                            }
                            label={option}
                            sx={{ userSelect: "none" }}
                          />
                        ))}
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          }
          return null;
        })}
      </Box>

      <Box>
        <Typography variant="subtitle1" sx={{ opacity: "0.6", marginTop: "1rem" }}>
          Помощь актуальна до:
        </Typography>
        <Calendar />
      </Box>

      <Box sx={{marginTop: "2rem"}}>
        <Button
          disabled={selectedOptions.length === 0}
          onClick={() => handleReset()}
          variant="outlined"
          sx={{
            width: "100%",
            color: "black",
            borderColor: "black",
            padding: 1,
          }}
        >
          СБРОСИТЬ
        </Button>
      </Box>
      
      {/* for the same margin as on top */}
      <h3></h3>
    </Paper>
  );
};

export default Filters;