const useNextRoute = () => {
    const nextRouteCheckFinishedBasicInfo = (currentUser) => {
        if (!currentUser.hasFinishedBasicInfo) {
            this.$router.push({ path: this.localePath('/info') })
        } else {
            this.$router.push({ path: this.localePath('/') })
        }
    }
    return { nextRouteCheckFinishedBasicInfo }
}

export default useNextRoute
