import * as React from 'react'
import {
  Form,
  Text,
  TextArea,
  Radio,
  RadioGroup,
  Checkbox,
  Select,
  FormValues,
  /* FormErrors,
   * StyledText,
   * StyledRadioGroup,
   * StyledRadio,
   * StyledTextArea,
   * StyledCheckbox,
   * StyledSelect, */
  FieldApi,
  //  FormField,
  FormApi
} from 'react-form'

//
// Introduction
//

// Form Api
class FormApiMethods extends React.Component {
  constructor (props: {}) {
    super(props)
    this.state = {}
  }

  render () {

    const FormContent = (props: { formApi: FormApi }) => (
      <form onSubmit={props.formApi.submitForm}>
        <Text field="hello" id="hello" />
        <button type="submit">Submit</button>
      </form>
    )

    return (
      <div>
        {/* By passing the formApi as a parameter to a child render function. */}
        <Form>
          { formApi => (
            <form onSubmit={formApi.submitForm}>
              <Text field="hello" id="hello" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>

        {/* By passing the formApi as a parameter to a render prop. */}
        <Form render={ formApi => (
            <form onSubmit={formApi.submitForm}>
            <Text field="hello" id="hello" />
            <button type="submit">Submit</button>
            </form>
            )}>
        </Form>

        {/* By passing the formApi as a prop to a component prop. */}
        <Form component={FormContent} />
      </div>
    )
  }
}

// Introduction example
const validate = value => ({
  error: !value || !/Hello World/.test(value) ? "Input must contain 'Hello World'" : null,
  warning: !value || !/^Hello World$/.test(value) ? "Input should equal just 'Hello World'" : null,
  success: value && /Hello World/.test(value) ? "Thanks for entering 'Hello World'!" : null
})

class IntroductionExample extends React.Component {

  render () {
    return <Form>
    {formApi => (
      <form onSubmit={formApi.submitForm} id="form1" className="mb-4">
        <label htmlFor="hello">Hello World</label>
        <Text field="hello" id="hello" validate={validate} />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    )}
  </Form>
  }
}

//
// Form Inputs
//

class TextInput extends React.Component {

  render () {
    return (
      <Form>
      {formApi => (
        <form onSubmit={formApi.submitForm} id="text-input-form">
          <label htmlFor="text-input-firstName">First name</label>
          <Text field="firstName" id="text-input-firstName" />
          <button type="submit" className="mb-4 btn btn-primary">
            Submit
          </button>
        </form>
      )}
      </Form>
    )
  }
}

class TextAreaInput extends React.Component {

  render () {
    return (
      <Form>
        {formApi => (
          <form onSubmit={formApi.submitForm} id="text-area-input-form">
            <label htmlFor="text-area-input-bio">Bio</label>
            <TextArea field="bio" id="text-area-input-bio" />
            <button type="submit" className="mb-4 btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </Form>
    )
  }
}

class RadioInput extends React.Component {

  render () {
    return (
      <Form>
        {formApi => (
          <form onSubmit={formApi.submitForm} id="radio-input-form">
            <RadioGroup field="gender">
              <label htmlFor="radio-input-male" className="mr-2">Male</label>
              <Radio value="male" id="radio-input-male" />
              <label htmlFor="radio-input-female" className="mr-2">Female</label>
              <Radio value="female" id="radio-input-female" />
            </RadioGroup>
            <button type="submit" className="mb-4 btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </Form>
    )
  }
}

class CheckboxInput extends React.Component {

  render () {
    return (
      <Form>
        {formApi => (
          <form onSubmit={formApi.submitForm} id="checkbox-input-form">
            <label htmlFor="checkbox-input-authorize" className="mr-2">Authorize</label>
            <Checkbox field="authorize" id="checkbox-input-authorize" />
            <button type="submit" className="mb-4 btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </Form>
    )
  }
}

class SelectInput extends React.Component {

  render () {

    const statusOptions = [
      {
        label: 'Single',
        value: 'single'
      },
      {
        label: 'In a Relationship',
        value: 'relationship'
      },
      {
        label: "It's Complicated",
        value: 'complicated'
      }
    ]

    return (
      <Form>
        {formApi => (
          <form onSubmit={formApi.submitForm} id="select-input-form">
            <label htmlFor="select-input-status">Relationship status</label>
            <Select field="status" id="select-input-status" options={statusOptions} className="mb-4" />
            <button type="submit" className="mb-4 btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </Form>
    )
  }
}

class DisabledTextInput extends React.Component {

  render () {
    return (
      <Form>
        {formApi => (
          <form onSubmit={formApi.submitForm} id="text-input-disabled-form">
            <label htmlFor="text-input-disabled-firstName">First name</label>
            <Text field="firstName" id="text-input-disabled-firstName" disabled />
            <button type="submit" className="mb-4 btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </Form>
    )
  }
}

//
// Basic Form
//
