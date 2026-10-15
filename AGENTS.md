<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Platform preview routes use one shared AppPlatformPage with unnested TanStack route filenames so each page renders independently of the app overview.
- App preview media uses CDN-hosted captures of the existing mobile website, labelled as website previews to avoid misrepresenting native app functionality.
