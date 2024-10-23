'use client'

import { useState } from 'react'
import Github from './ui/icons/github'
import {
  CldImage,
  CldUploadButton,
  type CloudinaryUploadWidgetInfo
} from 'next-cloudinary'
import dynamic from 'next/dynamic'
const TwoUpWrapper = dynamic(() => import('./ui/TwoUpWrapper'), {
  ssr: false
})

export default function App() {
  const [resource, setResource] = useState<
    CloudinaryUploadWidgetInfo | undefined | string
  >()
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [promptCustom, setPromptCustom] = useState<string>()

  const halloweenIngredients = [
    'Calabaza',
    'Ojos de gelatina',
    'Sangre falsa (jarabe)',
    'Fantasmas de merengue',
    'Arañas de chocolate',
    'Manzanas envenenadas',
    'Dedos de bruja (galletas)',
    'Cerebros de gelatina'
  ]

  const handleIngredientSelect = (ingredient: string) => {
    setSelectedIngredients(prevIngredients =>
      prevIngredients.includes(ingredient)
        ? prevIngredients.filter(i => i !== ingredient)
        : [...prevIngredients, ingredient]
    )
  }

  const handleSubmitRecipe = () => {
    if (resource && typeof resource === 'object') {
      const ingredientsText = selectedIngredients.join(' ')
      const prompt = `Crea una receta espeluznante con los siguientes ingredientes ${ingredientsText}`

      setPromptCustom(prompt)
    }
  }

  return (
    <div className="grid grid-rows-[1fr_1fr] items-center justify-items-center min-h-screen">
      <header className="w-full flex justify-between p-4 items-center fixed z-10 top-0">
        <h1 className="text-4xl text-[#d8bd91]">SpookyBites</h1>
        <nav>
          <ul>
            <li>
              <a href="test">
                <Github className="size-6 opacity-80 hover:opacity-100 transition-opacity duration-300" />
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="relative w-full h-full">
        <div className="h-full bg-bannerChef bg-no-repeat bg-cover w-full">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-6xl font-bold text-center text-foreground text-[#ec4f16]">
              ¡Bienvenidos a SpookyBites!
            </h2>
            <p className="text-3xl text-center text-foreground text-[#d8bd91]">
              Transforma tus recetas en creaciones escalofriantes
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#101010]">
          {typeof resource === 'undefined' && (
            <>
              <h2 className="text-3xl font-bold text-center text-foreground text-[#d8bd91]">
                Ingresa tu ingrediente secreto
              </h2>
              <CldUploadButton
                onSuccess={(result, { widget }) => {
                  setResource(result?.info)
                  widget.close()
                }}
                uploadPreset="spookybites"
                className="bg-[#d8bd91] text-[#101010] p-3 rounded-lg mt-4"
                options={{
                  sources: ['local'],
                  multiple: false,
                  maxFiles: 1,
                  language: 'es',
                  text: {
                    es: {
                      or: 'O',
                      menu: {
                        files: 'Subir desde tu dispositivo'
                      },
                      local: {
                        browse: 'Seleccionar',
                        dd_title_single: 'Arrastra tu imagen aquí'
                      }
                    }
                  }
                }}
              >
                Subir imagen
              </CldUploadButton>
            </>
          )}
          {typeof resource === 'object' && (
            <div className="flex flex-col items-center">
              <TwoUpWrapper
                imageUrl={resource.secure_url}
                publicId={resource.public_id}
                promptCustom={promptCustom}
              />
              <section className="mt-4">
                <h3 className="text-2xl font-bold text-center text-foreground text-[#d8bd91]">
                  Selecciona tus ingredientes espeluznantes:
                </h3>
                <ul className="flex flex-wrap justify-center mt-4 gap-4">
                  {halloweenIngredients.map(ingredient => (
                    <li
                      key={ingredient}
                      className={`cursor-pointer p-2 border-2 rounded-md ${
                        selectedIngredients.includes(ingredient)
                          ? 'bg-[#ec4f16] text-white'
                          : 'bg-[#d8bd91] text-black'
                      }`}
                      onClick={() => handleIngredientSelect(ingredient)}
                      onKeyDown={() => handleIngredientSelect(ingredient)}
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </section>

              <button
                type="button"
                onClick={handleSubmitRecipe}
                className="bg-[#ec4f16] text-white p-3 rounded-lg mt-4"
              >
                Generar receta espeluznante
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
