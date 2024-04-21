export const loadMoreButton = {
    isHiden: true,
    disabled: true,
    loading: false,
    buttonAdress: null,

    buttonState({ isHiden = this.isHiden, disabled = this.disabled, loading = this.loading }) {
        isHiden ? this.buttonAdress.classList.add('visually-hidden') : this.buttonAdress.classList.remove('visually-hidden');
        disabled ? this.buttonAdress.disabled = true : this.buttonAdress.disabled = false;
        loading ? this.buttonAdress.textContent = 'Loading...' : this.buttonAdress.textContent = 'Load-more';
    }
}