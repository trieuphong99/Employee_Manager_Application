import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { ReactstrapInput } from "reactstrap-formik";

import * as overtimesActions from '../../actions/overtimes'
import SingleDatePicker from '../../helpers/singleDatePicker'
import Time from '../../../commons/const/Time'
import TimePickers from './TimePicker';
import { validationSchema } from './validate';
import { toastError } from '../../../commons/helpers/toastHelpers/'

function DayOffForm(props) {
  const {
    overtimesActions,
    buttonLabel,
    title,
    item,
    id
  } = props
  const [modal, setModal] = useState(false);
  const initialValues =
    item ? {
      date: moment(item.date, Time.crossDMY),
      start_at: item.start_at,
      end_at: item.end_at,
      reason: item.reason
    } : {
        date: moment(),
        start_at: moment().format(Time.HM),
        end_at: moment().add(3, 'hour').format(Time.HM),
        reason: ''
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
              date: moment(values.date).format(Time.crossDMY),
              reason: values['reason'].trim()
            }
            if (!_.isEqual(initialValues, values)) {
              if (item === undefined) overtimesActions.addOvertimes(data, setErrors, setSubmitting, toggle)
              else overtimesActions.updateOvertimes(id, data, setErrors, setSubmitting, toggle)
            }
            else {
              toggle()
              toastError("Nothing change")
              setSubmitting(false)
            }
          }}
        >
          {({ setFieldValue, values, errors }) => (
            <Form>
              <ModalHeader toggle={toggle}>{title}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col xs="12">
                    <Label for="date">Date</Label>
                    <SingleDatePicker
                      id="date"
                      name="date"
                      date={values.date}
                      setFieldValue={setFieldValue}
                    />
                    <ErrorMessage name="date">{msg => <div style={{ display: "block" }} className="invalid-feedback">{msg}</div>}</ErrorMessage>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Label for="start_at">Start</Label>
                    <TimePickers
                      id="start_at"
                      name={"start_at"}
                      defaultTime={values['start_at']}
                      onChange={e => setFieldValue('start_at', e.target.value)}
                    />
                    <ErrorMessage name="start_at">{msg => <div style={{ display: "block" }} className="invalid-feedback">{msg}</div>}</ErrorMessage>
                  </Col>
                  <Col xs="6">
                    <Label for="end_at">End</Label>
                    <TimePickers
                      id="end_at"
                      name={"end_at"}
                      defaultTime={values['end_at']}
                      onChange={e => setFieldValue('end_at', e.target.value)}
                    />
                    <ErrorMessage name="end_at">{msg => <div style={{ display: "block" }} className="invalid-feedback">{msg}</div>}</ErrorMessage>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <Field
                      name="reason"
                      label="Reason"
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
    overtimesActions: bindActionCreators(overtimesActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayOffForm);