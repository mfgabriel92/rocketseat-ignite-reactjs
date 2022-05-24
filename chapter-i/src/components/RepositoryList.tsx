import { useEffect, useState } from "react"
import { RepositoryItem } from "./RepositoryItem"

interface Repository {
  name: string;
  description: string;
}

function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/mfgabriel92/repos").then((result) => result.json())
      .then((data) => setRepositories(data))
  }, []);

  return (
    <section className="repository-list">
      <h1>Repository list</h1>
      <ul>
        {repositories.map((repository) => {
          return <RepositoryItem key={repository.name} repository={repository} />
        })}
      </ul>
    </section>
  )
}

export { RepositoryList }