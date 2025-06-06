import { APIError } from 'better-auth/api'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function capitalizeEveryWord(str: string) {
	if (!str) return '' // Handle empty strings
	return str
		.split(' ') // Split the string into words
		.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
		.join(' ') // Join the words back into a single string
}

export function pluralToSingular(word: string) {
	// Common cases for regular plural forms
	if (word.endsWith('ies')) {
		return word.slice(0, -3) + 'y' // e.g. 'cities' -> 'city'
	} else if (word.endsWith('es')) {
		return word.slice(0, -2) // e.g. 'buses' -> 'bus'
	} else if (word.endsWith('s')) {
		return word.slice(0, -1) // e.g. 'cats' -> 'cat'
	} else {
		return word // If the word doesn't end with 's', assume it's already singular
	}
}

export function processWordsArray(words: string[]) {
	const clonedWords = [...words]
	clonedWords.splice(0, 1)
	if (!Array.isArray(clonedWords) || clonedWords.length < 2) {
		return clonedWords // Return as-is if input is invalid or too short
	}

	const lastWord = clonedWords[clonedWords.length - 1]

	if (lastWord === 'add') {
		// Combine 'add' and the word before the last word
		const secondLastWord = clonedWords[clonedWords.length - 2]
		clonedWords[clonedWords.length - 1] = `add ${pluralToSingular(secondLastWord)}`
		// words.splice(words.length - 2, 1); // Remove the word before 'add'
	} else if (lastWord === 'edit' && clonedWords.length > 2) {
		// Combine 'edit' and the third-to-last word
		const thirdLastWord = clonedWords[clonedWords.length - 3]
		clonedWords[clonedWords.length - 1] = `edit ${pluralToSingular(thirdLastWord)}`
		clonedWords.splice(clonedWords.length - 2, 1) // Remove the word before 'edit'
	}

	return clonedWords
}

// Format date and times
export const formatDateTime = (dateString: Date) => {
	const dateTimeOptions: Intl.DateTimeFormatOptions = {
		month: 'short', // abbreviated month name (e.g., 'Oct')
		year: 'numeric', // abbreviated month name (e.g., 'Oct')
		day: 'numeric', // numeric day of the month (e.g., '25')
		hour: 'numeric', // numeric hour (e.g., '8')
		minute: 'numeric', // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	}
	const dateOptions: Intl.DateTimeFormatOptions = {
		month: '2-digit', // abbreviated month name (e.g., 'Oct')
		year: '2-digit', // numeric year (e.g., '2023')
		day: '2-digit', // numeric day of the month (e.g., '25')
	}
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: 'numeric', // numeric hour (e.g., '8')
		minute: 'numeric', // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	}
	const formattedDateTime: string = new Date(dateString).toLocaleString('en-GH', dateTimeOptions).replace(/\b(am|pm)\b/, match => match.toUpperCase())
	const formattedDate: string = new Date(dateString).toLocaleString('en-GH', dateOptions)
	const formattedTime: string = new Date(dateString).toLocaleString('en-GH', timeOptions).replace(/\b(am|pm)\b/, match => match.toUpperCase())
	return {
		dateTime: formattedDateTime,
		dateOnly: formattedDate,
		timeOnly: formattedTime,
	}
}

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
	if (error.name === 'ZodError') {
		// Handle Zod error
		const fieldErrors = Object.keys(error.errors).map(field => error.errors[field].message)

		return fieldErrors.join('. ')
	} else if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
		// Handle Prisma error
		const field = error.meta?.target ? error.meta.target[0] : 'Field'
		return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
	} else if (error instanceof APIError) {
		console.log(error.body)
		return error.message
	} else {
		// Handle other errors
		return typeof error.message === 'string' ? error.message : JSON.stringify(error.message)
	}
}
