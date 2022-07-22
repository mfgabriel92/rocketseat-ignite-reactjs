import * as zod from "zod";

export default zod
  .object({
    name: zod.string().min(1, "Name is required"),
    email: zod.string().min(1, "Email is required").email("The e-mail is not valid"),
    password: zod.string().min(8, "Password must contain min. 8 characters"),
    confirmPassword: zod.string().min(8, "Confirm password must contain min. 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
