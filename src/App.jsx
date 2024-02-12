import { useState } from 'react'
import logo from './logo.svg'
import {QueryClient,QueryClientProvider} from "react-query";
import Search from "/components/Search.jsx";
import './App.css'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Search />

    </QueryClientProvider>
   
  )
}

export default App
