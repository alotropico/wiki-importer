const isWikidataId = (str: string): boolean => /^q\d+$/i.test(str)

export default isWikidataId
