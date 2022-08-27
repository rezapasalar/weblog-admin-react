import faker from '@faker-js/faker'

class DataFactory {

    $locale = 'fa'

    $axios = ''

    $count = 10

    create () {
        return new Promise(async (resolve, reject) => {
            try {
                await this.loopForCreate()
                return resolve()
            } catch (e) {
                return reject(e)
            }
        })
    }

    async loopForCreate () {
        try {
            faker.locale = this.$locale
            for (let i = 0; i < this.$count; i++) {
                await this.$axios(this.defination())
            }
        } catch (e) {
            return Promise.reject(e)
        }
    }

    count (value = 10) {
        this.$count = value
        return this
    }

    locale (value) {
        this.$locale = value
        return this
    }

    axios (value) {
        this.$axios = value
        return this
    }

    fakeEmail () {
        faker.locale = 'en'
        const email = faker.internet.email()
        faker.locale = this.$locale
        return email
    }
}

export default DataFactory