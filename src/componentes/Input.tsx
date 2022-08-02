export function Input({ register, name, ...rest }: any) {
  return <input {...register(name)} {...rest} />;
}
