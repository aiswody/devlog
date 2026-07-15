import * as runtime from "react/jsx-runtime";
import type { ElementType } from "react";

type MDXComponents = Record<string, ElementType>;

/** velite가 function-body 문자열로 컴파일한 MDX를 컴포넌트로 복원한다 */
function getMDXComponent(code: string): ElementType<{
  components?: MDXComponents;
}> {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

interface MDXContentProps {
  code: string;
  components?: MDXComponents;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = getMDXComponent(code);
  return <Component components={components} />;
}
