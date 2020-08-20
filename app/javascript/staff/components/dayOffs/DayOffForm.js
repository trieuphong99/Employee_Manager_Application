import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { ReactstrapInput, ReactstrapSelect, ReactstrapRadio } from "reactstrap-formik";

import * as dayOffActions from '../../actions/dayOffs'
import * as options from './selectOptions'
import Time from '../../../commons/const/Time'
import DatePicker from './dateRangePicker'
import moment from 'moment';
import { validationSchema } from './validate';
import { toastError } from '../../../commons/helpers/toastHelpers/'

function DayOffForm(props) {
  const {
    dayOffActions,
    buttonLabel,
    title,
    item
  } = props

  const [modal, setModal] = useState(false);
  const initialValues = item ? {
    from_date: moment(item.from_date, Time.crossDMY),
    to_date: moment(item.to_date, Time.crossDMY),
    status: item.status,
    reason: item.reason,
    is_paid: item.is_paid
  } : {
      from_date: moment(),
      to_date: moment().add(1, 'day'),
      status: '',
      reason: '',
      is_paid: false
    }
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button style={{ width: "100px" }} color="info" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} centered={true} zIndex={90}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            const data = {
              ...values,
              from_date: moment(values.from_date).format(Time.crossDMY),
              to_date: moment(values.to_date).format(Time.crossDMY),
              reason: values['reason'].trim(),
              request_date: moment().format(Time.crossDMY)
            }
            if (!_.isEqual(initialValues, values)) {
              if (item === undefined) dayOffActions.addDayOffs(data, setErrors, setSubmitting, toggle)
              else dayOffActions.updateDayOffs(item.id, data, setErrors, setSubmitting, toggle)
            }
            else {
              toggle()
              toastError("Nothing change")
              setSubmitting(false)
            }
          }}
        >
          {({ handleSubmit, setFieldValue, values, errors, touched }) => (
            < Form onSubmit={handleSubmit}>
              <ModalHeader toggle={toggle}>{title}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col xs="12">
                    <Label for="from_date">Date</Label>
                    <DatePicker
                      name="from_date"
                      id="date"
                      blockRange="none"
                      block={true}
                      startDate={values.from_date}
                      endDate={values.to_date}
                      setFieldValue={setFieldValue}
                    />
                    <ErrorMessage name="from_date">{msg => <div style={{ display: "block" }} className="invalid-feedback">{msg}</div>}</ErrorMessage>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Field
                      label="Status"
                      name="status"
                      component={ReactstrapSelect}
                      inputprops={{
                        name: "status",
                        id: "status",
                        options: options.status,
                        defaultOption: "Select"
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>Is paid</Label>
                    <Row className="is-paid" style={{ marginLeft: "0px" }}>
                      <Field
                        name="is_paid"
                        component={ReactstrapRadio}
                        value={Boolean(true)}
                        type="radio"
                        label="True"
                      />
                      <Field
                        name="is_paid"
                        component={ReactstrapRadio}
                        value={Boolean(false)}
                        type="radio"
                        label="False"
                      />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <Field
                      label="Reason"
                      name="reason"
                      type="textarea"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">Submit</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </div >
  )
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    dayOffActions: bindActionCreators(dayOffActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayOffForm);