import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './AnecdoteForm'
import Notification from './Notification'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteList = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const anecdotes = data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: "SHOW_NOTIFICATION", message: `Anecdote ${anecdote.content} received a vote` })

  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
