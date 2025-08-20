const { RuleTester } = require("eslint");
const rule = require("../lib/rules/enforce-async-params");

const tester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

tester.run("enforce-async-params", rule, {
  valid: [
    `export async function Page(context) {
       const { params } = await context;
     }`,
    `export default async function Page({ params }) {
       const { statusCode } = params;
     }`,
    `const Page = async ({ searchParams }) => {
       const { message } = searchParams ?? {};
     }`,
  ],
  invalid: [
    {
      code: `export function Page(context) {
        const { params } = context;
      }`,
      errors: [{ messageId: "requireAsync" }],
    },
    {
      code: `const Page = (context) => {
        const { searchParams } = context;
      }`,
      errors: [{ messageId: "requireAsync" }],
    },
    {
      code: `export default function Page({ params }) {
        const { statusCode } = params;
      }`,
      errors: [{ messageId: "requireAsync" }],
    },
    {
      code: `const Page = ({ searchParams }) => {
        const { message } = searchParams ?? {};
      }`,
      errors: [{ messageId: "requireAsync" }],
    },
  ],
});
