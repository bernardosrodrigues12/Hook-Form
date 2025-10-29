import { useForm } from 'react-hook-form';
import styles from './Form.module.css'

const BaseForm = () => {
    
  const { 
    register,
    handleSubmit, 
    formState: {errors} 
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <h2 className={styles.title}>User registration</h2>

        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
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
            className={styles.input}
            type="email"
            placeholder="Type your email"
            {...register('email', {required: true})}
            />
            {errors?.email?.type === 'required' && 
            <p role='alert' className={styles.error}>
              Email is required
            </p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Create a password"
            {...register('password', {required: true, minLength: 3})}
            />
            {errors?.password?.type === 'minLength' && 
            <p role='alert' className={styles.error}>
              Password must have at least 3 characters
            </p>}
        </div>

        

        <button type="submit" onClick={handleSubmit(onSubmit)} className={styles.button}>Register</button>
      </form>
    </div>
  );
}
export default BaseForm;