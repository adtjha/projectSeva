import { render } from '@testing-library/react'
import React, { Fragment } from 'react'
import reactDom from 'react-dom'
import Dice from './Dice'
import one from '../images/dice/1.svg'
import two from '../images/dice/2.svg'
import three from '../images/dice/3.svg'
import four from '../images/dice/4.svg'
import five from '../images/dice/5.svg'
import six from '../images/dice/6.svg'
import { Transition } from '@headlessui/react'


// TEST =================================================================================================
test('<Dice /> matches snapshot', () => {
    const num = 1
    const srcList = [one, two, three, four, five, six]
    
    const component = render(
        <div className="flex flex-col items-center py-8">
            <div className="w-32 h-32">
                <Transition
                    as={Fragment}
                    show={true}
                    enter="transform transition duration-300"
                    enterFrom="opacity-0 -rotate-180 scale-50"
                    enterTo="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 scale-95 "
                >
                    <div
                        className="w-16 font-mono text-4xl m-auto text-center p-0 text-gray-400"
                        onClick={() => {}}
                    >
                        <img src={srcList[num-1]} alt={num}></img>
                    </div>
                </Transition>
            </div>
        </div>
    )

    expect(component.container).toMatchSnapshot()
})

// TEST =================================================================================================
test('<Dice /> is rendering without crashing', () => {
    const div = document.createElement('div')
    render(
        <div className="flex flex-col items-center py-8">
            <div className="w-32 h-32">
                <Transition
                    as={Fragment}
                    show={true}
                    enter="transform transition duration-300"
                    enterFrom="opacity-0 -rotate-180 scale-50"
                    enterTo="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 scale-95 "
                >
                    <div
                        className="w-16 font-mono text-4xl m-auto text-center p-0 text-gray-400"
                        onClick={() => {}}
                    >
                        <img src={one} alt={1}></img>
                    </div>
                </Transition>
            </div>
        </div>,
        div
    )
})

// TEST =================================================================================================
test('Defaults to one', () => {
    const div = document.createElement('div')
    render(
        <div className="flex flex-col items-center py-8">
            <div className="w-32 h-32">
                <Transition
                    as={Fragment}
                    show={true}
                    enter="transform transition duration-300"
                    enterFrom="opacity-0 -rotate-180 scale-50"
                    enterTo="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 scale-95 "
                >
                    <div
                        className="w-16 font-mono text-4xl m-auto text-center p-0 text-gray-400"
                        onClick={() => {}}
                    >
                        <img src={one} alt={1}></img>
                    </div>
                </Transition>
            </div>
        </div>,
        div
    )
})

// TEST =================================================================================================
test('roll dice on dice_roll event', () => {})

// TEST =================================================================================================
test('click to roll dice if not hasRolled', () => {})
