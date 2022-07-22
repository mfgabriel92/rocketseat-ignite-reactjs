import * as zod from "zod";

export default zod.object({
  email: zod.string().email("The e-mail is not valid"),
  password: zod.string().min(8, "Password must contain min. 8 characters"),
});
