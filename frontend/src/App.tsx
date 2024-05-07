import { useEffect, useState, useRef, FormEvent } from 'react';
import { FiTrash, FiEdit } from 'react-icons/fi';
import { api } from './services/api';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App() {

  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<CustomerProps | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get('/customers');
    setCustomers(response.data);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value) {
      return alert('Preencha os campos corretamente');
    }

    const response = await api.post('/customers', {
      name: nameRef.current?.value,
      email: emailRef.current?.value
    });

    setCustomers(allCustomers => [...allCustomers, response.data]);
  }

  async function handleDelete(id: string) {
    try {
      await api.delete(`/customers`, {
        params: {
          id: id
        }
      });
      
      const allCustomers = customers.filter( customer => customer.id !== id);
      setCustomers(allCustomers);

    } catch (error) {
      console.log(error)
    }
  }

  async function handleEdit() {
    try {
      if (!editingCustomer || !nameRef.current?.value || !emailRef.current?.value) {
        return alert('Preencha os campos corretamente');
      }

      const status = statusRef.current?.checked ?? false;

      const response = await api.put(`/customers?id=${editingCustomer.id}`, {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        status: status
      });

      const updatedCustomers = customers.map( customer => {
        if (customer.id === editingCustomer.id) {
          return response.data;
        }

        return customer;
      });

      closeEditModal();
      setCustomers(updatedCustomers);

    } catch (error) {
      console.log(error);
    }
  }

  function openEditModal(customer: CustomerProps) {
    setEditingCustomer(customer);
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
    setEditingCustomer(null);
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>

        <form className="flex flex-col my-8" onSubmit={handleSubmit}>

          <label className="font-medium text-white">Nome</label>
          <input className="w-full mb-5 p-2" ref={nameRef} type="text" placeholder="Digite seu nome completo" />

          <label className="font-medium text-white">E-mail</label>
          <input className="w-full mb-5 p-2" ref={emailRef} type="email" placeholder="Digite seu e-mail" />

          <input type="submit" value="Cadastrar" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"/>

        </form>

        <section className="flex flex-col gap-4">

          `{customers.map( (customer) => (
            
              <article key={customer.id} className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
              <p><span className="font-medium">Nome: </span>{ customer.name }</p>
              <p><span className="font-medium">E-mail: </span>{ customer.email }</p>
              <p><span className="font-medium">Status: </span>{ customer.status ? "ATIVO" : "INATIVO"}</p>
          
              <button className='bg-yellow-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-1 top-3' onClick={() => openEditModal(customer)} ><FiEdit size={18} color='#FFF' /></button>
              <button className='bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-1 top-12' onClick={ () => handleDelete(customer.id) }><FiTrash size={18} color='#FFF' /></button>
                      
            </article>
          ))}`

        </section>

        {isEditModalOpen && editingCustomer && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="w-full relative bg-gray-900 rounded-lg max-w-lg mx-auto p-6">
                <button className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700" onClick={closeEditModal}>X</button>

                <h1 className='text-white'>Editar Cliente: <span className='font-bold'>{editingCustomer.name}</span></h1>
                <form className="flex flex-col my-8" onSubmit={handleEdit}>

                  <label className="font-medium text-white">Nome</label>
                  <input className="w-full mb-5 p-2" ref={nameRef} type="text" defaultValue={editingCustomer.name}/>

                  <label className="font-medium text-white">E-mail</label>
                  <input className="w-full mb-5 p-2" ref={emailRef} type="email" defaultValue={editingCustomer.email}/>

                  <label className="font-medium text-white flex items-center">Ativo
                  <input className="ml-2" type="checkbox" name="status" defaultChecked={editingCustomer?.status} ref={statusRef}></input>
                  </label>

                  <input type="submit" value="Editar" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"/>

                </form>
              </div>
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}