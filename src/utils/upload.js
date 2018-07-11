export default async function upload({
  accessToken,
  client,
  file,
  spaceId,
}) {
  const response = await client.post(
    `/spaces/${spaceId}/assets`,
    { filename: file.name },
    { headers: { Authorization: accessToken } },
  );

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();

    Object.keys(response.data.fields).forEach((key) => {
      formData.set(key, response.data.fields[key]);
    });

    formData.set(`file`, file);
    xhr.onreadystatechange = () => {
      const allowedStatuses = [200, 201, 204];

      if (xhr.readyState === 4) {
        if (allowedStatuses.includes(xhr.status)) {
          resolve(response.data);
        } else {
          reject(new Error(`Error during upload with status: ${xhr.status}`));
        }
      }
    };
    xhr.open(`POST`, response.data.post_url);
    xhr.send(formData);
  });
}
