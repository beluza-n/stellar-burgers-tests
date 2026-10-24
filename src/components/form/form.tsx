import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useState } from 'react';

import { namePattern } from '@utils/constants';

import type { IFormProps } from './types';
import type { ChangeEvent, FC, FocusEvent, FormEvent } from 'react';

import styles from './form.module.css';

type TFormValue = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const Form: FC<IFormProps> = ({ setMode, className }) => {
  const [formValue, setFormValue] = useState<TFormValue>({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [isNameError, setIsNameError] = useState(false);
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const fieldName = event.target.name as keyof TFormValue;

    setFormValue((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value,
    }));
  };

  const handleNameBlur = (event?: FocusEvent<HTMLInputElement>): void => {
    const value = event?.currentTarget.value ?? '';
    setIsNameError(value.length > 0 && !namePattern.test(value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (formValue.password !== formValue.repeatPassword) {
      setIsPasswordMismatch(true);
      return;
    }

    setMode('complete');
  };

  const isSubmitDisabled =
    !formValue.name ||
    !formValue.email ||
    !formValue.password ||
    !formValue.repeatPassword;

  return (
    <form
      className={clsx(styles.form, className)}
      data-testid="form"
      onSubmit={handleSubmit}
    >
      <div className={styles.icon} />
      <div className={styles.text_box}>
        <p className="text text_type_main-large">Мы нуждаемся в вашей силе!</p>
        <p className={clsx(styles.text, 'text text_type_main-medium')}>
          Зарегистрируйтесь на нашей платформе, чтобы присоединиться к списку
          контрибьюторов
        </p>
      </div>
      <fieldset className={styles.fieldset}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleInputChange}
          onBlur={handleNameBlur}
          value={formValue.name}
          name="name"
          error={isNameError}
          errorText="Некорректный формат имени"
          extraClass={styles.input}
          required
          data-testid="name-input"
        />
        <EmailInput
          onChange={handleInputChange}
          value={formValue.email}
          name="email"
          extraClass={styles.input}
          required
          data-testid="email-input"
        />
        <PasswordInput
          onChange={handleInputChange}
          value={formValue.password}
          name="password"
          extraClass={styles.input}
          required
          data-testid="password-input"
        />
        <PasswordInput
          onChange={handleInputChange}
          value={formValue.repeatPassword}
          name="repeatPassword"
          placeholder="Повторите пароль"
          extraClass={styles.input}
          required
          data-testid="repeat-password-input"
        />
        {isPasswordMismatch && (
          <p className="input__error text_type_main-default">Пароли не совпадают</p>
        )}
        <Button htmlType="submit" disabled={isSubmitDisabled}>
          Зарегистрироваться
        </Button>
      </fieldset>
      <div className={styles.signin_box}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={styles.signin_btn}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
