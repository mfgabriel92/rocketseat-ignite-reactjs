interface RepositoryItemProps {
  repository: {
    name: string;
    description: string;
  }
}

function RepositoryItem(props: RepositoryItemProps) {
  return(
    <li>
      <strong>{props.repository.name}</strong>
      <p>{props.repository.description}</p>
    </li>
  );
}

export { RepositoryItem };