import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Example schema - extend or modify based on your needs
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

interface FormProps {
  onSubmit: (data: FormData) => Promise<void>;
  defaultValues?: Partial<FormData>;
}

export const Form = ({ onSubmit, defaultValues }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && (
          <span className="error">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            {...register('rememberMe')}
          />
          Remember me
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
