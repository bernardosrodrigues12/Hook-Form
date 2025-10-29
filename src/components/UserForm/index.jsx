import { useForm } from 'react-hook-form';
import styles from './UserForm.module.css'
import isEmail from 'validator/lib/isEmail';

const UserForm = () => {
    
  const { 
    register,
    handleSubmit, 
    watch,
    formState: {errors} 
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  const watchPassword = watch('password');

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <h2 className={styles.title}>User registration</h2>

        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            className={errors?.name ? styles.inputError : styles.input}
            type="text"
            placeholder="Type your name"
            {...register('name', {required: true})}
            />
            {errors?.name?.type === 'required' &&
            <p role='alert' className={styles.error}>
              Name is required
            </p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={errors?.email ? styles.inputError : styles.input}
            type="email"
            placeholder="Type your email"
            {...register('email', {
              required: true,
              validate: (value) => isEmail(value)})}
            />

            {errors?.email?.type === 'required' && 
            <p role='alert' className={styles.error}>
              Email is required
            </p>}

            {errors?.email?.type === 'validate' && 
            <p role='alert' className={styles.error}>
              Type a valid email
            </p>}

        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            className={errors?.password ? styles.inputError : styles.input}
            type="password"
            placeholder="Create a password"
            {...register('password', {required: true, minLength: 3})}
            />
            {errors?.password?.type === 'required' && 
            <p role='alert' className={styles.error}>
              Password is required
            </p>}
            {errors?.password?.type === 'minLength' && 
            <p role='alert' className={styles.error}>
              Password must have at least 3 characters
            </p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password Confirmation</label>
          <input
            className={errors?.passwordConfirmation ? styles.inputError : styles.input}
            type="password"
            placeholder="Type your password again"
            {...register('passwordConfirmation', {
              required: true, 
              validate: (value) => value === watchPassword,
            })}
            />

            {errors?.passwordConfirmation?.type === 'required' && 
            <p role='alert' className={styles.error}>
              Password Confirmation is required
            </p>}

            {errors?.passwordConfirmation?.type === 'validate' && 
            <p role='alert' className={styles.error}>
              Passwords must be same
            </p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Role</label>
          <select className={styles.select}
            {...register("role", { validate: (value) => {
              return value !== '0';
            }})}
            >
            <option value='0'>Choose your Role ... </option>
            <option value='frontend'>FrontEnd Developer</option>
            <option value='backend'>BackEnd Developer</option>
            <option value='fullstack'>FullStack Developer</option>
            <option value='devops'>Devops Engineer</option>
            <option value='tester'>Software Tester</option>
          </select>
            {errors?.role?.type === 'validate' && 
            <p role='alert' className={styles.error}>
              Role is required
            </p>}
        </div>

        

        <button type="submit" onClick={handleSubmit(onSubmit)} className={styles.button}>Register</button>
      </form>
    </div>
  );
}
export default UserForm;