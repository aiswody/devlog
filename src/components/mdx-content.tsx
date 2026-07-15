import * as runtime from "react/jsx-runtime";
import type { ComponentType } from "react";

/** velite가 function-body 문자열로 컴파일한 MDX를 컴포넌트로 복원한다 */
function getMDXComponent(code: string): ComponentType<{
  components?: Record<string, ComponentType>;
}> {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

interface MDXContentProps {
  code: string;
  components?: Record<string, ComponentType>;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = getMDXComponent(code);
  return <Component components={components} />;
}
