import { useEffect } from "react";
import styles from "./Filters.module.css";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getBrandsListSelector } from "../../redux/brands/selectors";
import { getBrandsList } from "../../redux/brands/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setAllFilters } from "../../redux/filters/slice";

export default function Filters() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrandsList({}));
  }, [dispatch]);

  const brandsList = useSelector(getBrandsListSelector);

  const brandSelect = {
    control: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      flexDirection: "row",
      gap: 32,
      borderRadius: 12,
      // paddingBlock: 12,
      paddingInline: 4,
      width: 204,
      height: 44,
      background: "#f7f7f7",
      border: "none",
      boxShadow: "none",
      cursor: "pointer",
    }),

    placeholder: (provided) => ({
      ...provided,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.25,
      color: "#101828",
      fontFamily: "Manrope, sans-serif",
      margin: 0,
    }),

    singleValue: (provided) => ({
      ...provided,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.25,
      color: "#101828",
      fontFamily: "Manrope, sans-serif",
    }),

    menu: (provided) => ({
      ...provided,
      border: "1px solid #f7f7f7",
      borderRadius: 12,
      width: 204,
      height: 272,
      boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",
      background: "#fff",
      marginTop: 4,
    }),

    menuList: (provided) => ({
      ...provided,
      paddingTop: 14,
      paddingBottom: 14,
      paddingLeft: 10,
      paddingRight: 0,
      height: 258,
    }),

    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.25,
      fontFamily: "Manrope, sans-serif",
      color: state.isSelected ? "#101828" : "#8d929a",
      backgroundColor: state.isFocused ? "#f2f2f2" : "#fff",
      cursor: "pointer",
      borderRadius: 8,
      padding: "10px 12px",
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      transition: "transform 0.2s",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      color: "#555",
      padding: 0,
      margin: 0,
    }),

    indicatorSeparator: () => ({
      display: "none",
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

  const priceOptions = Array.from({ length: 20 }, (_, i) => {
    const value = (i + 1) * 10;
    return { value, label: value.toString() };
  });

  const validationSchema = Yup.object({
    brandSelect: Yup.object().nullable(),
    priceSelect: Yup.object().nullable(),
    minMileage: Yup.number().nullable(),
    maxMileage: Yup.number().nullable(),
  });

  const handleClick = (values) => {
    dispatch(setAllFilters(values));
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          brand: "",
          rentalPrice: "",
          minMileage: "",
          maxMileage: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleClick}
      >
        {({ setFieldValue, values }) => (
          <Form className={styles.filtersForm}>
            {/* Car brand */}
            <label htmlFor="brandSelect" className={styles.brandLabel}>
              Car brand
              <Select
                className={styles.formSelect}
                options={brandsList.map((item) => ({
                  value: item,
                  label: item,
                }))}
                styles={brandSelect}
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                }}
                placeholder="Choose a brand"
                isLoading={!brandsList.length}
                name="brand"
                value={values.brand.value}
                onChange={(option) => setFieldValue("brand", option.value)}
              />
              <ErrorMessage name="brand" component="div" className="error" />
            </label>

            {/* Price */}
            <label htmlFor="rentalPrice" className={styles.brandLabel}>
              Price/ 1 hour
              <Select
                className={styles.formSelect}
                options={priceOptions}
                styles={brandSelect}
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                }}
                placeholder="Choose a price"
                formatOptionLabel={(option, { context }) =>
                  context === "menu" ? option.label : `To $${option.label}`
                }
                isLoading={!brandsList.length}
                name="rentalPrice"
                value={values.rentalPrice.value}
                onChange={(option) =>
                  setFieldValue("rentalPrice", option.value.toString())
                }
              />
              <ErrorMessage
                name="priceSelect"
                component="div"
                className="error"
              />
            </label>

            {/* Mileage */}
            <label htmlFor="minMileage" className={styles.mileageLabel}>
              Сar mileage / km
              <div className={styles.inputWrapper}>
                <Field
                  type="number"
                  name="minMileage"
                  id="minMileage"
                  className={styles.mileageInput}
                  placeholder="From"
                ></Field>
                <Field
                  type="number"
                  name="maxMileage"
                  id="maxMileage"
                  className={styles.mileageInputMax}
                  placeholder="To"
                />
              </div>
            </label>

            {/* Submit */}
            <button type="submit" className={styles.submitButton}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
