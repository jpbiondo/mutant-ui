interface SocialIconButtonProps {
  children: React.ReactNode;
  url: string;
}

export default function SocialIconButton({
  children,
  url,
}: SocialIconButtonProps) {
  return (
    <a href={url} target="_blank">
      <button className="btn btn-primary">{children}</button>
    </a>
  );
}
