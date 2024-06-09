"use client";

import MaxWidthWrapper from "@/components/layouts/MaxWidthWrapper";
import { useGlobalContext } from "@/context/StoreProvider";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const AdminProductPanel = () => {
  const { data: session } = useSession();
  const [addProductModal, setAddProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const { getProductsFromAPI, createProduct, updateProduct, deleteProduct  } =
    useGlobalContext();

  function handleEdit(): void {
    throw new Error("Function not implemented.");
  }

  function handleDelete(): void {
    throw new Error("Function not implemented.");
  }

  function handleCategoriaChange(event: ChangeEvent<HTMLSelectElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <MaxWidthWrapper>
      <section className="dark:bg-gray-900 p-4 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      placeholder="Buscar Producto"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setAddProductModal(true)}
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-1.5 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Agregar Producto
                </button>
                <Dropdown label="Filtros" inline>
                  <Dropdown.Item>Category</Dropdown.Item>
                  <Dropdown.Item>Price</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      Producto
                    </th>
                    <th scope="col" className="p-4">
                      Categoria
                    </th>
                    <th scope="col" className="p-4">
                      Stock
                    </th>
                    <th scope="col" className="p-4">
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex items-center mr-3">
                        <img
                          src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
                          alt="iMac Front Image"
                          className="h-8 w-auto mr-3"
                        />
                        Apple iMac 27&#34;
                      </div>
                    </th>
                    <td className="px-4 py-3">
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        Desktop PC
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full inline-block mr-2 bg-red-700"></div>
                        95
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      1.47
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setEditProductModal(true)}
                          className="flex items-center justify-center text-green-600 bg-green-100 hover:bg-green-200 focus:ring-4 focus:ring-green-300 border border-green-300 rounded-lg text-sm font-medium px-4 py-2"
                        >
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteProductModal(true)}
                          className="flex items-center justify-center text-red-600 bg-red-100 hover:bg-red-200 focus:ring-4 focus:ring-red-300 border border-red-300 rounded-lg text-sm font-medium px-4 py-2"
                        >
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2zm4 0V4a2 2 0 012-2h2a2 2 0 012 2v2M15 6V4a2 2 0 012-2h2a2 2 0 012 2v2"
                            ></path>
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal show={addProductModal} onClose={() => setAddProductModal(false)}>
          <Modal.Header>Agregar Producto</Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  id="product-name"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-details"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Detalles (máximo 50 caracteres)
                </label>
                <input
                  type="text"
                  id="product-details"
                  maxLength={50}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Descripción
                </label>
                <textarea
                  id="product-description"
                  rows={3}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Categoría del Producto
                </label>
                <select
                  id="product-category"
                  value="all"
                  onChange={handleCategoriaChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Electrónica">Electrónica</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Hogar">Hogar</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Juguetes">Juguetes</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-stock"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Stock del Producto
                </label>
                <input
                  type="number"
                  id="product-stock"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Precio del Producto
                </label>
                <input
                  type="text"
                  id="product-price"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => setAddProductModal(false)}
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Agregar Producto
            </button>
            <button
              type="button"
              onClick={() => setAddProductModal(false)}
              className="text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-primary-300 border border-gray-300 rounded-lg text-sm font-medium px-4 py-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600"
            >
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={editProductModal}
          onClose={() => setEditProductModal(false)}
        >
          <Modal.Header>Editar Producto</Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  id="product-name"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-details"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Detalles (máximo 50 caracteres)
                </label>
                <input
                  type="text"
                  id="product-details"
                  maxLength={50}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Descripción
                </label>
                <textarea
                  id="product-description"
                  rows={3}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Categoría del Producto
                </label>
                <select
                  id="product-category"
                  value="all"
                  onChange={handleCategoriaChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Electrónica">Electrónica</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Hogar">Hogar</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Juguetes">Juguetes</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-stock"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Stock del Producto
                </label>
                <input
                  type="number"
                  id="product-stock"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Precio del Producto
                </label>
                <input
                  type="text"
                  id="product-price"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => setAddProductModal(false)}
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Agregar Producto
            </button>
            <button
              type="button"
              onClick={() => setAddProductModal(false)}
              className="text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-primary-300 border border-gray-300 rounded-lg text-sm font-medium px-4 py-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600"
            >
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={deleteProductModal}
          size="md"
          onClose={() => setDeleteProductModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Esta seguro que desea eliminar este producto?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => setDeleteProductModal(false)}
                >
                  {"Si, Estoy Seguro"}
                </Button>
                <Button
                  color="gray"
                  onClick={() => setDeleteProductModal(false)}
                >
                  No, Cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </section>
    </MaxWidthWrapper>
  );
};

export default AdminProductPanel;
