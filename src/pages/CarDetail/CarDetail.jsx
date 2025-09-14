import { useEffect } from "react";
import styles from "./CarDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCarItems } from "../../redux/car/operations";
import { useParams } from "react-router";
import { getCarDetail } from "../../redux/car/selectors";
import ListItem from "../../components/ListItem/ListItem";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createRent } from "../../redux/rent/slice";

export default function CarDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCarItems(id));
  }, [dispatch, id]);

  const car = useSelector(getCarDetail);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bookingDate: Yup.date().required("Booking date is required"),
    comment: Yup.string(),
  });

  const handleSubmit = (values) => {
    alert("Rent created!");
    dispatch(
      createRent({
        ...values,
        bookingDate: values.bookingDate.toISOString(),
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imgFormWrap}>
          <div className={styles.thumb}>
            <img className={styles.carImg} src={car.img} alt="" />
          </div>
          <div className={styles.rentForm}>
            <h3 className={styles.formHeader}>Book your car now</h3>
            <p className={styles.formDescr}>
              Stay connected! We are always ready to help you.
            </p>

            <Formik
              initialValues={{
                name: "",
                email: "",
                bookingDate: null,
                comment: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values }) => (
                <Form className={styles.formContainer}>
                  <div className={styles.formFieldItem}>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name*"
                      className={styles.formField}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.formFieldItem}>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email*"
                      className={styles.formField}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.formFieldItem}>
                    <DatePicker
                      id="bookingDate"
                      selected={values.bookingDate}
                      onChange={(date) => setFieldValue("bookingDate", date)}
                      dateFormat="dd MMMM yyyy"
                      className={styles.formField}
                      placeholderText="Booking date"
                    />
                    <ErrorMessage
                      name="bookingDate"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.formFieldItem}>
                    <Field
                      id="comment"
                      name="comment"
                      as="textarea"
                      placeholder="Comment"
                      className={styles.formFieldComment}
                      rows="3"
                    />
                  </div>

                  <button type="submit" className={styles.buttonSubmit}>
                    Send
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div>
          <div className={styles.carHead}>
            <div className={styles.headerWrapper}>
              <h2 className={styles.carHeader}>
                {car.brand} {car.model}, {car.year}
              </h2>
              <p className={styles.idContainer}>Id: {car.id}</p>
            </div>
            <div className={styles.locationWrapper}>
              <div className={styles.addressWrapper}>
                <svg className={styles.locationIcon}>
                  <use href="/sprite.svg#icon-Location"></use>
                </svg>
                {car?.address
                  ? car.address.slice(car.address.indexOf(",") + 1).trim()
                  : ""}
              </div>
              <div>
                Mileage: {car?.mileage?.toLocaleString("uk-UA") || ""} km
              </div>
            </div>
            <div className={styles.priceCondition}>${car.rentalPrice}</div>
            <p className={styles.carDescription}>{car.description}</p>
          </div>
          <div className={styles.listsWrapper}>
            <div className={styles.listDescrItem}>
              <p className={styles.conditionHead}>Rental Conditions: </p>
              <ul className={styles.conditionList}>
                {car?.rentalConditions?.map((item, index) => (
                  <ListItem text={item} key={index} />
                )) || null}
              </ul>
            </div>
            <div className={styles.listDescrItem}>
              <p className={styles.conditionHead}>Car Specifications:</p>
              <ul className={styles.conditionListSpec}>
                <li className={styles.listItemSpec}>
                  <svg className={styles.iconMarker}>
                    <use href="/sprite.svg#icon-calendar"></use>
                  </svg>
                  <p className={styles.description}>Year: {car.year}</p>
                </li>
                <li className={styles.listItemSpec}>
                  <svg className={styles.iconMarker}>
                    <use href="/sprite.svg#icon-car"></use>
                  </svg>
                  <p className={styles.description}>Type: {car.type}</p>
                </li>
                <li className={styles.listItemSpec}>
                  <svg className={styles.iconMarker}>
                    <use href="/sprite.svg#icon-fuel-pump"></use>
                  </svg>
                  <p className={styles.description}>
                    Fuel Consumption: {car.fuelConsumption}
                  </p>
                </li>
                <li className={styles.listItemSpec}>
                  <svg className={styles.iconMarker}>
                    <use href="/sprite.svg#icon-calendar"></use>
                  </svg>
                  <p className={styles.description}>
                    Engine Size: {car.engineSize}
                  </p>
                </li>
              </ul>
            </div>
            <div className={styles.listDescrItem}>
              <p className={styles.conditionHead}>
                Accessories and functionalities:
              </p>
              <ul className={styles.conditionList}>
                {car?.accessories?.map((item, index) => (
                  <ListItem text={item} key={index} />
                )) || null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
