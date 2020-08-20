import React, { useState } from 'react';
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { ReactstrapInput, ReactstrapSelect } from "reactstrap-formik";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Col, Container, Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Label
} from "reactstrap";
import * as actions from '../../../actions/account';
import * as options from './selectOptions';
import * as validate from './validate';
import _ from 'lodash';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toastError } from '../../../../commons/helpers/toastHelpers';
import "./index.css"

const AccountForm = (props) => {
  const {
    actions,
    buttonLabel,
    title,
    item,
    id
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setListRole(formatListRole)
  }

  const initialValues = validate.initialValues(item)
  const validationSchema = validate.validationSchema(item)

  const animatedComponents = makeAnimated();
  const initRole = _.map(options.roles, e => ({
    value: e.toLowerCase(),
    label: e,
    isDisabled: false
  }))
  let formatListRole = () => {
    if (item) {
      let admin = _.find(item.roles, e => e.name === "Admin")
      return _.map(initRole, e => (
        admin
          ? { ...e, isDisabled: e.value !== "admin" }
          : { ...e, isDisabled: e.value === "admin" }))
    }
    return initRole;
  }
  const [listRole, setListRole] = useState(formatListRole);

  const selectRoles = (e, setFieldValue) => {
    const curOptions = e;
    const admin = _.find(curOptions, option => option.value === "admin");
    const checkCurOptionsNotEmpty = !_.isNull(curOptions) && !_.isEmpty(curOptions);

    let tmpListRole = _.map(initRole, e => (
      admin
        ? { ...e, isDisabled: e.value !== "admin" }
        : { ...e, isDisabled: e.value === "admin" && checkCurOptionsNotEmpty }
    ))
    setListRole(tmpListRole);

    let selected = admin ? [admin] : checkCurOptionsNotEmpty ? curOptions : [];
    setFieldValue('roles', selected);
  };
  return (
    <div style={{ display: "inline-block" }}>
      <Button className="btn" color="info" onClick={toggle}>{buttonLabel}</Button>
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={
            (values, { setErrors, setSubmitting }) => {
              const status = values.status === "Active"
              values = _.mapValues(values, s => typeof (s) === "string" ? s.trim() : s); //trim obj
              const data = { ...values, status }
              if (!_.isEqual(initialValues, values)) {
                if (item === undefined) {
                  actions.addNewAccountRequest(data, setErrors, setSubmitting, toggle)
                }
                else {
                  actions.updateAccountRequest(id, data, setErrors, setSubmitting, toggle)
                }
              }
              else {
                toggle()
                toastError("Nothing change")
                setSubmitting(false)
              }
            }
          }
        >
          {({ handleSubmit, isSubmitting, values, errors, setFieldValue }) => {
            return <Form onSubmit={handleSubmit} >
              <ModalHeader toggle={toggle}>{title}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col xs="6">
                    <Field
                      label="Name"
                      name="name"
                      component={ReactstrapInput}
                    />
                  </Col>
                  <Col xs="6">
                    <Field
                      label="Phone Number"
                      name="phone_number"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs="6">
                    <Field
                      label="Address"
                      name="address"
                      component={ReactstrapInput}
                    />
                  </Col>
                  <Col xs="6">
                    <Field
                      type="date"
                      label="Date of birth"
                      name="date_of_birth"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs="6">
                    <Field
                      label="Email"
                      name="email"
                      component={ReactstrapInput}
                    />
                  </Col>
                  <Col xs="6">
                    <Field
                      label="Id card"
                      name="id_card"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs="6">
                    <Field
                      type="date"
                      label="Joining date"
                      name="joining_date"
                      component={ReactstrapInput}
                    />
                  </Col>
                  <Col xs="6">
                    <Field
                      type="date"
                      label="Official date"
                      name="official_date"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs="6">
                    <Field
                      label="Contract type"
                      name="contract_type"
                      component={ReactstrapSelect}
                      inputprops={{
                        name: "contract_type",
                        options: options.contract_type,
                        defaultOption: "Select"
                      }}
                    />
                  </Col>
                  <Col xs="6">
                    <Field
                      label="Position"
                      name="position"
                      component={ReactstrapSelect}
                      inputprops={{
                        name: "position",
                        id: "position",
                        options: options.position,
                        defaultOption: "Select"
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs="6">
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
                  <Col xs="6">
                    <Field
                      label="Gender"
                      name="sex"
                      component={ReactstrapSelect}
                      inputprops={{
                        name: "sex",
                        id: "sex",
                        options: options.sex,
                        defaultOption: "Select"
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs="6">
                    <Label>Roles</Label>
                    <Select
                      name='roles'
                      options={listRole}
                      defaultValue={values.roles}
                      onChange={(e) => selectRoles(e, setFieldValue)}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      isSearchable={true}
                    />
                    {errors.roles && <div className="errorRole">{errors.roles}</div>}
                  </Col>
                  <Col xs="6">
                    {!item &&
                      <Field
                        label="Password"
                        name="password"
                        component={ReactstrapInput}
                      />
                    }
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">Submit</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Form>
          }}
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
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
