import React, { useInsertionEffect } from 'react'
import { Link } from 'react-router-dom'

export const NotFound: React.FC<{ code: 404 | 500 }> = ({ code }) => {

  const { title, message } = {
    404: {title: 'Page not found', message: 'Sorry, we couldn’t find the page you’re looking for.'},
    500: {title: 'Internal server error', message: 'Oops! Something went wrong. Check back soon!'},
  }[code]

  useInsertionEffect(() => {
    document.title = `${code} - ${title}`
  }, [])

  return (
    <div className="lg:min-h-screen mx-auto flex flex-col justify-center w-full max-w-2xl px-6 lg:px-8 py-12">
      <div className="text-center">
        <p className="font-mono text-4xl font-bold text-neutral-200">{code}</p>
        <h1 className="mt-4 text-lg font-bold">{title}</h1>
        <div className="mt-2 prose"><p>{message}</p></div>
        <Link to="/" aria-label="Homepage" className="inline-block mt-4 text-sm font-bold leading-6 text-primary hover:text-secondary active:text-secondary">
          {'Go back home'}
        </Link>
      </div>
    </div>
  )
}
