import * as React from 'react';

type FieldPathItem = number | string | FieldPath
interface FieldPathArray extends Array<FieldPathItem> {}
type FieldPath = string | FieldPathArray

type NestedValue<TModel, TValue> = {
  [P in keyof TModel]: TValue | NestedValue<TModel[P], TValue>
}

type Nested<TModel> = {
  [P in keyof TModel]: TModel[P] | Nested<TModel[P]>
}

export type FormValues<T> = Nested<T>

type Node<TValue> = {
  field: string
  fullField: FieldPath
  api: FieldApi<any>
        getState(): FieldValues<TValue>
        getProps(): any
}

export type Touched<T> = NestedValue<T, boolean>

export interface FormState<TModel> {
  values: TModel
  touched: Touched<TModel>
  errors?: NestedValue<TModel, ValidationValue>
  warnings: NestedValue<TModel, ValidationValue>
  successes: NestedValue<TModel, ValidationValue>
  submits: number
  submitted: boolean
  submitting: boolean
  asyncValidations: number
  validating: NestedValue<TModel, boolean>
        validationFailures: number
  validationFailed: NestedValue<TModel, boolean>
}

export interface FormApi<TFormModel = any, TNestedModel = TFormModel> {
  submitForm(): Promise<void>
  setValue(field: FieldPath, value: any): void
  getValue(field: FieldPath): any
  setTouched(field: FieldPath, value?: boolean): void
  getTouched(field: FieldPath): boolean
  getWarning(field: FieldPath): FeedbackValue | undefined
  getError(field: FieldPath): FeedbackValue | undefined
  getSuccess(field: FieldPath): FeedbackValue | undefined
  getFormState(): FormState<TFormModel>
  setFormstate(state: TFormModel): void
  setError(field: FieldPath, value: FeedbackValue): void
  setWarning(field: FieldPath, value: FeedbackValue): void
  setSuccess(field: FieldPath, value: FeedbackValue): void
  resetAll(): void
  reset(field: FieldPath): void
  clearAll(): void
  addValue(field: FieldPath, value: any): void
  removeValue(field: FieldPath, index: number): void
  setAllValues(values: TFormModel): void
  setAllTouched(): void
  swapValues(field: FieldPath, index: number, destIndex: number): void
  register(node: Node<any>): void
  deregister(node: Node<any>): void
  asyncValidate(field: FieldPath, opts: ValidateOpts): void
  validate(field: FieldPath, opts: ValidateOpts): void
  preValidate(field: FieldPath, opts: ValidateOpts): void
  getFullField(field: FieldPath): FieldPath
  getNodeByField(field: FieldPath): Node<any>
}

type FeedbackValue = string | undefined

interface ValidateOpts {
  submitting: boolean
}

interface FieldValues<TValue> {
  fieldName: FieldPath
  value: TValue
  touched: boolean
  error: string
  warning: string
  success: string
}

interface FieldApi<TValue> extends FieldValues<TValue> {
  setValue(value: TValue | undefined): void
  setTouched(touched?: boolean): void
  setError(error: FeedbackValue): void
  setWarning(warning: FeedbackValue): void
  setSuccess(success: FeedbackValue): void
  addValue(value: TValue): void
  removeValue(index: number): void
  swapValues(index: number, destIndex: number): void
  reset(): void
  validatingField(): void
  doneValidatingField(): void
  validate(opts: ValidateOpts): void
  preValidate(opts: ValidateOpts): void
  asyncValidate(opts: ValidateOpts): void
}

interface NestedFieldProps {
  field: string
}

type ValidationValue = string
export type ValidationResult = null | ValidationValue | {
  success?: string
  warning?: string
  error?: string
}

interface FieldProps<TValue> {
  field: string
  defaultValue?: TValue
  validate?: (value: TValue) => ValidationResult
}

export type NestedComponentProps<TModel> = {
  fieldApi: FormApi<any, TModel>
}

export type ComponentProps<TValue> = {
  fieldApi: FieldApi<TValue>
}

export function withField<T, TValue>(
  Comp: React.ComponentClass<T & ComponentProps<TValue>> | React.StatelessComponent<T & ComponentProps<TValue>>,
  defaults?: TValue): React.StatelessComponent<T & FieldProps<TValue>>;

export function withNestedField<T, TModel>(
  Comp: React.ComponentClass<T & NestedComponentProps<TModel>>, defaults?: TModel): React.StatelessComponent<T & NestedFieldProps>;

export type WithFormApiComponentProps<TModel> = {
  formApi: FormApi<TModel> & FormState<TModel>
}

export function withFormApi<T, TModel>(
  Comp: React.ComponentClass<T & WithFormApiComponentProps<TModel>>,
  defaults?: TModel) : React.StatelessComponent<T>

export interface FormContext<TModel> {
  formApi: FormApi<TModel>;
}

type RenderReturn = React.ReactNode

type FormChildrenProps<TModel> = FormApi<TModel> & TModel

type FormComponentProps<TModel> = {
  formApi: FormApi<TModel> & TModel
}

export interface FormProps<TModel> {
  children?: ((props: FormChildrenProps<TModel>) => RenderReturn) | RenderReturn
  component?: React.ComponentClass<FormComponentProps<TModel>> |
        React.StatelessComponent<FormComponentProps<TModel>>
  render?: (api: FormChildrenProps<TModel>) => RenderReturn
  pure?: boolean
  preValidate?(values: TModel): FormValues<TModel>;
  validate?(values: TModel): NestedValue<TModel, ValidationResult>
        asyncValidate?(values: TModel): Promise<NestedValue<TModel, ValidationResult>>
        validateOnMount?: boolean
  validateOnSubmit?: boolean
  defaultValues?: TModel
  onSubmit?(values: TModel, e: React.SyntheticEvent<any>, formApi: FormApi<TModel>): void;
  preSubmit?(values: TModel): FormValues<TModel>;
  onSubmitFailure?(errors: NestedValue<TModel, ValidationResult>, onSubmitError: Error, formApi: FormApi<TModel> ): void
  onChange?(formState: TModel, formApi: FormApi<TModel>): void
  preventDefault?: boolean
  getApi?(api: FormApi<TModel>): void
}

export class Form<TModel> extends React.Component<FormProps<TModel>> implements React.ChildContextProvider<FormContext<TModel>> {
  static defaultProps: FormProps<any>;
  static childContextTypes: {
    formApi: React.Validator<any>
  };
  
  getDefaultState(): TModel;
  getChildContext(): FormContext<TModel>;
  componentWillMount(): void;
  componentWillReceiveProps(nextProps: Readonly<Partial<FormProps<TModel>>>, nextContext: any): void;
  componentWillUmount(): void;

  render(): RenderReturn;
}

// Nested Field
type NestedChildrenProps<TModel> = FormApi<TModel>

export interface NestedFieldProps2<TModel> {
  children?: ((props: NestedChildrenProps<TModel>) => RenderReturn) | RenderReturn
  component?: React.ComponentClass<NestedComponentProps<TModel>>
  render?: (api: NestedChildrenProps<TModel>) => RenderReturn
  defaultValues?: TModel
  // TODO: field can be only string?
  field: string
}

export class NestedField<TModel> extends React.Component<NestedFieldProps2<TModel>> {
}

export const Text: React.StatelessComponent<FieldProps<string> & React.InputHTMLAttributes<HTMLInputElement>>;

export const TextArea: React.StatelessComponent<FieldProps<string> & React.TextareaHTMLAttributes<HTMLTextAreaElement>>;

export class RadioGroup extends React.Component<FieldProps<string>> {}
export const Radio: React.StatelessComponent< React.InputHTMLAttributes<HTMLInputElement>>;

export const Checkbox: React.StatelessComponent<FieldProps<boolean> & React.InputHTMLAttributes<HTMLInputElement>>;

export type SelectOptions = Array<{
    value: string
    label: string
}>;

export interface SelectProps extends FieldProps<string> {
    options: SelectOptions;
}

export const Select: React.StatelessComponent<SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>>;
