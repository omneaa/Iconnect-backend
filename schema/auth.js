const {z} = require ('zod');
const registerSchema = z.object ({
  body: z
    .object ({
      firstname: z
        .string ()
		.trim ()
        .refine (value => !/\s/.test (value), {
          message: 'Firstname should be a single word without spaces',
        }),
      lastname: z
        .string ()
		.trim ()
        .refine (value => !/\s/.test (value), {
          message: 'Lastname should be a single word without spaces',
        }),
      username: z.string ().trim (),
      email: z.string ().email (),
      password: z.string ().min (6),
      phone: z.string (),
      gender: z.enum (['male', 'female']),
      confirmPassword: z.string (),
    })
    .refine (data => data.password === data.confirmPassword, {
      message: 'Password and password confirmation must match',
      path: ['confirmPassword'],
    }),
});

const loginSchema = z.object ({
  body: z
    .object ({
      email: z.string ().email (),
      password: z.string ()
    })
});

const forgotPasswordSchema = z.object ({
  body: z
    .object ({
      email: z.string ().email (),
    })
});

const resetPasswordSchema = z.object ({
  body: z
    .object ({
      email: z.string ().email (),
      newPassword: z.string ().min (6),
      confirmNewPassword: z.string (),
    })
    .refine (data => data.newPassword === data.confirmNewPassword, {
      message: 'Password and password confirmation must match',
      path: ['confirmNewPassword'],
    }),
});

module.exports = { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema };

