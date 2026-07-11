export async function renderDetails(container, params) {
  container.innerHTML = `<p>Здесь будут эпизоды подкаста с id: ${params.id}</p>`;
}