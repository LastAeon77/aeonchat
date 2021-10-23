export type post = {
    title: string
    username: string
    content: string

}
export type income_data = {
    new_post: post |undefined,
    set_post: React.Dispatch<React.SetStateAction<post|undefined>> 
  }