import { useForm } from 'react-hook-form';
import styles from './UserForm.module.css'
import isEmail from 'validator/lib/isEmail';

/**
 * Componente UserForm
 * 
 * Um componente React que implementa um formulário de registro de usuário usando react-hook-form.
 * Recursos incluem:
 * - Validação de nome
 * - Validação de email usando validator.js
 * - Senha com requisito de comprimento mínimo
 * - Confirmação de senha correspondente
 * - Seleção de função/cargo
 * - Gerenciamento de estado do formulário e tratamento de erros
 * 
 * @returns {JSX.Element} Um componente de formulário para registro de usuário
 */
const UserForm = () => {
    
  // Inicializa o react-hook-form com seus métodos essenciais
  const { 
    register,      // Função para registrar campos do formulário
    handleSubmit,  // Função para lidar com o envio do formulário
    watch,         // Função para observar mudanças nos campos do formulário
    formState: {errors}  // Objeto contendo o estado de erros do formulário
  } = useForm();

  /**
   * Manipula o envio do formulário
   * @param {Object} data - O objeto de dados do formulário contendo todos os valores dos campos
   */
  const onSubmit = (data) => {
    console.log(data);
  }

  // Observa o campo de senha para validação da confirmação
  const watchPassword = watch('password');

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <h2 className={styles.title}>User registration</h2>

        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          {/* Campo de entrada de nome com validação obrigatória */}
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
          {/* Campo de email com validação obrigatória e de formato usando isEmail */}
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
          {/* Campo de senha com validação obrigatória e de comprimento mínimo */}
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
          {/* Campo de confirmação de senha com validação de correspondência */}
          <input
            className={errors?.passwordConfirmation ? styles.inputError : styles.input}
            type="password"
            placeholder="Type your password again"
            {...register('passwordConfirmation', {
              required: true, 
              validate: (value) => value === watchPassword, // Validate password match
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
          {/* Lista suspensa de seleção de cargo com validação para garantir que um cargo seja selecionado */}
          <select className={styles.select}
            {...register("role", { validate: (value) => {
              return value !== '0'; // Valida se um cargo diferente do padrão foi selecionado
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