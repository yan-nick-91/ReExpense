let revokedTokens = new Set<string>()

export const revokeToken = (token: string) => {
    revokedTokens.add(token)
}

export const isTokenRevoked = (token: string): boolean => {
    return revokedTokens.has(token)
}