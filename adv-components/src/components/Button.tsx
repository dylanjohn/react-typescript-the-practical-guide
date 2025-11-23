import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    href?: never;
};

type AnchorProps = ComponentPropsWithoutRef<'a'> &{
    href: string;
}; 

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
    return (props as AnchorProps).href !== undefined;
}

export default function Button(props: ButtonProps | AnchorProps) {
  if(isAnchorProps(props)) {
    return (
      <a className="button" {...props}></a>
    );
  }

  return <button className="button" {...props}></button>;
}