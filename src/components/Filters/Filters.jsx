import { useEffect } from "react";
import styles from "./Filters.module.css";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getBrandsListSelector } from "../../redux/brands/selectors";
import { getBrandsList } from "../../redux/brands/operations";

export default function Filters() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrandsList({}));
  }, [dispatch]);

  const brandsList = useSelector(getBrandsListSelector);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      margin: 0,
      padding: 0,
      paddingRight: 4,
      border: "1px solid #d9d9d9",
      borderRadius: 4,
      width: 296,
      minHeight: 33,
      boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 0, 0, 0.25)" : "none",
      borderColor: state.isFocused ? "#000" : "#d9d9d9",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      "&:hover": { borderColor: "#000" },
    }),
    placeholder: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "155%",
      color: "#595d62",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      margin: 0,
      padding: 0,
      transition: "transform 0.2s",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      color: "#555",
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: state.isFocused ? 4 : 8,
      padding: "0 8px 0 12px",
      height: 41,
      display: "flex",
      alignItems: "center",
      width: "100%",
      backgroundColor: state.isFocused ? "#d3d3d3" : "#fff",
      color: "#000",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
      maxHeight: 41 * 6,
      overflowY: "hidden",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: 41 * 6,
      overflowX: "hidden",
      padding: 0,
    }),
    singleValue: (provided) => ({
      ...provided,
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "155%",
      color: "#000",
    }),
  };

  const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <svg
        width="16"
        height="15"
        style={{
          marginRight: 8,
          marginLeft: 4,
          transform: props.selectProps.menuIsOpen
            ? "rotateY(180deg)"
            : "rotateY(0deg)",
          transformOrigin: "center",
          transition: "transform 0.2s ease-in-out",
          fill: "#fff",
          strokeWidth: 1,
          stroke: "#000",
        }}
      >
        <use href="/sprite.svg#icon-chevron-down"></use>
      </svg>
    </components.DropdownIndicator>
  );
  return (
    <div className={styles.container}>
      <Select
        options={brandsList.map((item) => {
          return {
            value: item,
            label: item,
          };
        })}
        styles={customStyles}
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        placeholder="Ingredient"
        isLoading={!brandsList.length}
        // onChange={handleIngredientChange}
        // value={valueForIngredientSelect}
      />
    </div>
  );
}
